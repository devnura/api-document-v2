// GET USERS
const getUsers = async (trx) => {
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

// GET RESERVATION
const getUser = async (params, trx) => {
  let result = await trx
    .select([
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
    ])
    .from('t_m_user as tmu')
    .leftJoin('t_m_group as tmg', function () {
      this.on('tmg.c_group_code', '=', 'tmu.c_group_code')
    })
    .where("tmu.c_code", params)
    .first();

  return result;
};

const insertUser = async (data, payload, trx) => {

  let result = await trx("t_m_user")
    .insert({
      "c_code" : data.c_code,
      "c_group_code" : data.c_group_code,
      "c_email" : data.c_email,
      "e_password" : data.passwordHash,
      "c_knowing_password" : data.knowingPassword,
      "c_first_name" : data.c_first_name,
      "c_last_name" : data.c_last_name ? data.c_last_name : null,
      "c_phone_number" : data.c_phone_number,
      "c_created_by" : payload.user_code ,
      "n_created_by" : payload.user_name ,
      "d_created_at" : trx.raw("NOW()") ,
    }, ['c_code'])
    
  return result[0];

};

const updateUser = async (params, data, payload, trx) => {
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

// UPDATE PASSWORD
const resetPassword = async (params, data, payload, trx) => {
  
  let rows = await trx("t_m_user").update({
    "e_password" : data.passwordHash,
    "c_knowing_password" : data.knowingPassword,
    "c_updated_by": payload.user_code,
    "n_updated_by": payload.user_name,
    "d_updated_at": trx.raw('NOW()')
  }, ["c_code"])
  .where({
    "c_code" : params,
    "c_status" : "A"
  })

return rows
}

// DELETE USER
const deleteUser = async (params, payload, trx) => {

  let rows = await trx('t_m_user').update({
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

const generateUserCode = async (trx) => {
  let result = await trx("t_m_user").first(trx.raw("CONCAT('U', DATE_FORMAT(NOW(), '%y%m%d'), LPAD((COUNT(i_id)+ 1),3 , '0')) AS code")).whereRaw("SUBSTRING(c_code, 1, 10) = CONCAT('U', DATE_FORMAT(NOW(), '%y%m%d'))")
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
  getUsers,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
  getUsers,
  resetPassword,
  checkDuplicatedInsert,
  generateUserCode,
  checkUpdate
};
