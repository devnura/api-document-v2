// GET USERS
exports.getUsers = async (trx) => {
  let result = await trx
    .select(
      "tmu.c_code",
      "tmu.c_group_code",
      "tmg.c_group_name",
      "tmu.c_email",
      "tmu.c_knowing_password",
      "tmu.c_first_name",
      "tmu.c_last_name",
      "tmu.c_phone_number",
      "tmu.c_status",
      "tmu.c_status_name",
      "tmu.c_created_by",
      "tmu.n_created_by",
      trx.raw("DATE_FORMAT(tmu.d_created_at, '%Y-%m-%d %H:%i:%S') AS d_created_at"),
      "tmu.c_updated_by",
      "tmu.n_updated_by",
      trx.raw("DATE_FORMAT(tmu.d_updated_at, '%Y-%m-%d %H:%i:%S') AS d_updated_at"),
      "tmu.c_deleted_by",
      "tmu.n_deleted_by",
      trx.raw("DATE_FORMAT(tmu.d_deleted_at, '%Y-%m-%d %H:%i:%S') AS d_deleted_at"),
    )
    .from('t_m_user as tmu')
    .leftJoin('t_m_group as tmg', function () {
      this.on('tmg.c_group_code', '=', 'tmu.c_group_code')
    })
    .orderBy("tmu.c_code", "DESC")

  return result;
};
exports.findAllDocument = async (trx) => {
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

exports.findAllDocumentDetail = async (trx) => {
  let result = await trx
    .select(
      "*"
    )
    .from('t_d_document_detail as tdd')
    .orderBy(["c_document_code"], "DESC")

  return result;
}

exports.getGroupList = async (trx) => {

  let result = await trx
    .select("*")
    .from('t_m_group as tmg')
    .orderBy("tmg.c_group_code", "ASC")

  return result;
};

