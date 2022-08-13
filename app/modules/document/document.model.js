const findAllDocument = async (trx) => {
  let result = await trx
    .select(
      "tdd.c_document_code",
      "tdd.c_document_name",
      "tdd.c_document_path",
      "tdd.q_document_item",
      trx.raw(`(SELECT
          COUNT(tddd.c_file_code)
        FROM
          t_d_document_detail tddd
        WHERE
          tddd.i_document_excel = tdd.i_document_excel
          AND tddd.c_status = 'U') AS q_uploaded_document`),
      "tdd.c_desc",
      "tdd.c_status",
      "tdd.c_status_name",
      "tdd.c_created_by",
      "tdd.n_created_by",
      trx.raw("DATE_FORMAT(d_created_at, '%Y-%m-%d %H:%i:%S') AS d_created_at"),
      "tdd.c_updated_by",
      "tdd.n_updated_by",
      trx.raw("DATE_FORMAT(d_updated_at, '%Y-%m-%d %H:%i:%S') AS d_updated_at"),
      "tdd.c_deleted_by",
      "tdd.n_deleted_by",
      trx.raw("DATE_FORMAT(d_deleted_at, '%Y-%m-%d %H:%i:%S') AS d_deleted_at"),
    )
    .from('t_d_document as tdd')
    .orderBy(["c_document_code"], "DESC")

  return result;
}

const findDocument = async (params, trx) => {
  let detail = []

  let result = await trx
    .select(
      "tdd.i_document_excel",
      "tdd.c_document_code",
      "tdd.c_document_name",
      "tdd.c_document_path",
      "tdd.q_document_item",
      trx.raw(`(SELECT
        COUNT(tddd.c_file_code)
      FROM
        t_d_document_detail tddd
      WHERE
        tddd.i_document_excel = tdd.i_document_excel
        AND tddd.c_status = 'U') AS q_uploaded_document`),
      "tdd.c_desc",
      "tdd.c_status",
      "tdd.c_status_name",
      "tdd.c_created_by",
      "tdd.n_created_by",
      trx.raw("DATE_FORMAT(d_created_at, '%Y-%m-%d %H:%i:%S') AS d_created_at"),
      "tdd.c_updated_by",
      "tdd.n_updated_by",
      trx.raw("DATE_FORMAT(d_updated_at, '%Y-%m-%d %H:%i:%S') AS d_updated_at"),
      "tdd.c_deleted_by",
      "tdd.n_deleted_by",
      trx.raw("DATE_FORMAT(d_deleted_at, '%Y-%m-%d %H:%i:%S') AS d_deleted_at"),
    )
    .from('t_d_document as tdd')
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
      .from('t_d_document_detail as tddd')
      .where("tddd.i_document_excel", result.i_document_excel)
      result = {...result, ...{detail : detail}}
      
      return result

    }
    return result
}

const insertDocument = async (data, payload, trx) => {

  let result = await trx("t_d_document")
    .insert({
      "c_document_code" : data.c_document_code,
      "c_document_name" : data.c_document_name,
      "c_document_path" : data.c_document_path,
      "q_document_item" : data.detail.length,
      "c_desc" : data.c_desc,
      "c_created_by" : payload.user_code,
      "n_created_by" : payload.user_name,
      "d_created_at" : trx.raw("NOW()") 
    })
  let returning = await trx.select(trx.raw("LAST_INSERT_ID() as i_document_excel")).first()

  return returning;

}

const insertDocumentDetail = async (data, trx) => {

  let result = await trx("t_d_document_detail")
    .insert(data)
  return result

}

const uploadPdf = async (params, file_url, payload, trx) => {

  let result = await trx("t_d_document_detail")
    .update({
      "c_file_url": file_url,
      "c_status" : "U",
      "c_status_name" : "UPLOADED",
      "c_upload_by" : payload.user_code,
      "n_upload_by" : payload.user_name,
      "d_upload_at" : trx.raw("now()"),

    })
    // .where("c_document_code", params.folder)
    .where("c_file_code", params.file)
    .whereNotIn("c_status", ["X"])

  return result;
}

const deleteDocument = async (params, payload, trx) => {

  let rows = await trx('t_d_document').update({
      "c_status": "X",
      "c_status_name" : "DELETED",
      "c_deleted_by" : payload.user_code,
      "n_deleted_by" : payload.user_name,
      "d_deleted_at": trx.raw('NOW()')
    })
    .where({
      "c_document_code": params,
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

  let result = await trx("t_d_document AS tdd").first(trx.raw("CONCAT('DXLS', DATE_FORMAT(NOW(), '%y%m%d'), LPAD((CAST(COUNT(tdd.i_document_excel) AS INTEGER)+ 1),3 , '0')) AS code")).whereRaw("SUBSTRING(c_document_code, 1, 10) = CONCAT('DXLS', DATE_FORMAT(NOW(), '%y%m%d'))")
  return result.code

}

const generateCodePdf = async (trx) => {
  let result = await trx("t_d_document_detail AS tdd").first(trx.raw("CONCAT('DPDF', DATE_FORMAT(NOW(), '%y%m%d'), LPAD((CAST(COUNT(tdd.i_document_excel) AS INTEGER)+ 1),3 , '0')) AS code")).whereRaw("SUBSTRING(c_file_code, 1, 10) = CONCAT('DPDF', DATE_FORMAT(NOW(), '%y%m%d'))")
  return result.code
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
  insertDocumentDetail,
  generateCodePdf,
  uploadPdf,

  deleteDocument,
  checkDuplicatedInsert,
  generateCode,
  checkUpdate
};
