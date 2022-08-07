const findAllDocument = async (trx) => {
  let result = await trx
    .select(
      "tdd.c_document_code",
      "tdd.c_document_name",
      "tdd.c_document_url",
      "tdd.q_document_item",
      trx.raw(`(SELECT
          COUNT(tddd.c_file_code)
        FROM
          doc.t_d_document_detail tddd
        WHERE
          tddd.i_document_excel = tdd.i_document_excel
          AND tddd.c_status = 'U') AS q_uploaded_document`),
      "tdd.c_desc",
      "tdd.c_status",
      "tdd.c_status_name",
      "tdd.c_created_by",
      "tdd.n_created_by",
      trx.raw("TO_CHAR(tdd.d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"),
      "tdd.c_updated_by",
      "tdd.n_updated_by",
      trx.raw("TO_CHAR(tdd.d_updated_at, 'YYYY-MM-DD HH:mm:SS') AS d_updated_at"),
      "tdd.c_deleted_by",
      "tdd.n_deleted_by",
      trx.raw("TO_CHAR(tdd.d_deleted_at, 'YYYY-MM-DD HH:mm:SS') AS d_deleted_at"),
    )
    .from('doc.t_d_document as tdd')
    .orderBy(["c_document_code"], "DESC")

  return result;
};

const findDocument = async (params, trx) => {
  let detail = []

  let result = await trx
    .select(
      "tdd.i_document_excel",
      "tdd.c_document_code",
      "tdd.c_document_name",
      "tdd.c_document_url",
      "tdd.q_document_item",
      trx.raw(`(SELECT
        COUNT(tddd.c_file_code)
      FROM
        doc.t_d_document_detail tddd
      WHERE
        tddd.i_document_excel = tdd.i_document_excel
        AND tddd.c_status = 'U') AS q_uploaded_document`),
      "tdd.c_desc",
      "tdd.c_status",
      "tdd.c_status_name",
      "tdd.c_created_by",
      "tdd.n_created_by",
      trx.raw("TO_CHAR(tdd.d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"),
      "tdd.c_updated_by",
      "tdd.n_updated_by",
      trx.raw("TO_CHAR(tdd.d_updated_at, 'YYYY-MM-DD HH:mm:SS') AS d_updated_at"),
      "tdd.c_deleted_by",
      "tdd.n_deleted_by",
      trx.raw("TO_CHAR(tdd.d_deleted_at, 'YYYY-MM-DD HH:mm:SS') AS d_deleted_at"),
    )
    .from('doc.t_d_document as tdd')
    .where("c_document_code", params)
    .first();
    
    if(result){
      detail = await trx
      .select(
        "tddd.i_document_excel",
        "tddd.c_file_code",
        "tddd.c_file_name",
        "tddd.c_file_url",
        "tddd.c_category",
        "tddd.c_status",
        "tddd.c_status_name",
      )
      .from('doc.t_d_document_detail as tddd')
      .where("tddd.i_document_excel", result.i_document_excel)

      return {
        result,
        detail : detail
      }

    }
    return result
};

const insertDocument = async (data, payload, trx) => {

  let result = await trx("t_m_user")
    .insert({
      "c_document_code" : data.c_document_code,
      "c_document_name" : data.c_document_name,
      // "c_document_url" : data.c_document_url,
      "q_document_item" : data.q_document_item,
      "c_desc" : data.c_desc,
      "c_created_by" : payload.user_code,
      "n_created_by" : payload.user_name,
      "d_created_at" : trx.raw("NOW()") 
    }, ['c_document_code'])
    
  return result[0];

};

const updateDocument = async (params, data, payload, trx) => {
  let result = await trx("t_m_user")
    .update({
      "c_group_code": data.c_group_code,
      "c_group_name": data.c_group_name,
      "c_email": data.c_email,
      "c_first_name": data.c_first_name,
      "c_last_name": data.c_last_name,
      "c_phone_number": data.c_phone_number,
      "c_updated_by": payload.user_code,
      "n_updated_by": payload.user_name,
      "d_updated_at": trx.raw("now()"),
    }, ["c_code"])
    .where("c_code", params)
    .where("c_status", "A")

  return result;
};

const deleteDocument = async (params, payload, trx) => {

  let rows = await trx('public.t_m_user').update({
      "c_status": "X",
      "c_status_name" : "DELETED",
      "c_deleted_by" : payload.user_code,
      "n_deleted_by" : payload.user_name,
      "d_deleted_at": trx.raw('NOW()')
    }, ['c_code'])
    .where({
      "c_code": params,
      "c_status": "A"
    })

  return rows

}

const checkDuplicatedInsert = async (data, trx) => {

  const result = await trx("t_m_user")
    .select('i_id')
    .where('c_email', data.c_email)
    .where('c_phone_number', data.c_phone_number)
    .where('c_status', "A")
    .first()

  return result
}

const generateCode = async (trx) => {
  let result = await trx.raw("SELECT 'DXLS'||to_char(NOW(), 'YYMMDD')||LPAD((COUNT(i_document_exceli_document_excel)+1)::text, 5, '0') AS code FROM t_d_document tdd WHERE substring(c_document_code, 0,10) = 'DXLS'||to_char(now(), 'YYMMDD')")

  return result.rows[0].code
}

const checkUpdate = async (params, data, before, trx) => {

  const result = await trx("t_m_user")
    .select(['c_email'])
    .where({
      'c_email': data.c_email,
      "c_phone_number" : data.c_phone_number
    })
    .whereNot({
      "c_email" : before.c_email,
      "c_phone_number" : before.c_phone_number
    })
    .where('c_status', "A")
    .whereNot("c_code", params)
    .first()

  return result

}

module.exports = {
  findAllDocument,
  findDocument,
  insertDocument,
  updateDocument,
  deleteDocument,
  checkDuplicatedInsert,
  generateCode,
  checkUpdate
};
