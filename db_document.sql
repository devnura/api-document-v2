-- db_document_dev.t_d_document definition

CREATE TABLE `t_d_document` (
  `i_document_excel` int(11) NOT NULL AUTO_INCREMENT,
  `c_document_code` varchar(16) NOT NULL,
  `c_document_name` varchar(64) NOT NULL,
  `c_document_path` varchar(128) NOT NULL,
  `q_document_item` int(11) NOT NULL,
  `c_desc` varchar(128) DEFAULT NULL,
  `c_status` varchar(1) NOT NULL DEFAULT 'A',
  `c_status_name` varchar(64) NOT NULL DEFAULT 'ACTIVE',
  `d_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `c_created_by` varchar(16) DEFAULT NULL,
  `n_created_by` varchar(64) DEFAULT NULL,
  `d_updated_at` timestamp NULL DEFAULT NULL,
  `c_updated_by` varchar(16) DEFAULT NULL,
  `n_updated_by` varchar(64) DEFAULT NULL,
  `d_deleted_at` timestamp NULL DEFAULT NULL,
  `c_deleted_by` varchar(16) DEFAULT NULL,
  `n_deleted_by` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`i_document_excel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- db_document_dev.t_d_document_detail definition

CREATE TABLE `t_d_document_detail` (
  `i_document_excel` int(11) NOT NULL,
  `c_document_code` varchar(16) NOT NULL,
  `c_file_code` varchar(16) NOT NULL,
  `c_file_name` varchar(64) NOT NULL,
  `c_file_url` varchar(64) NOT NULL,
  `c_category` varchar(128) NOT NULL,
  `c_status` varchar(1) NOT NULL DEFAULT 'A',
  `c_status_name` varchar(64) NOT NULL DEFAULT 'ACTIVE',
  `d_upload_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `c_upload_by` varchar(16) DEFAULT NULL,
  `n_upload_by` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- db_document_dev.t_d_refresh_token definition

CREATE TABLE `t_d_refresh_token` (
  `i_refresh_token` int(11) NOT NULL AUTO_INCREMENT,
  `c_refresh_token` varchar(256) NOT NULL,
  `d_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `c_user_code` varchar(16) NOT NULL,
  PRIMARY KEY (`i_refresh_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- db_document_dev.t_m_group definition

CREATE TABLE `t_m_group` (
  `i_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_group_code` varchar(16) NOT NULL,
  `c_group_name` varchar(64) NOT NULL,
  `c_status` varchar(1) NOT NULL DEFAULT 'A',
  `c_status_name` varchar(64) NOT NULL DEFAULT 'ACTIVE',
  `d_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `c_created_by` varchar(16) DEFAULT NULL,
  `n_created_by` varchar(64) DEFAULT NULL,
  `d_updated_at` timestamp NULL DEFAULT NULL,
  `c_updated_by` varchar(16) DEFAULT NULL,
  `n_updated_by` varchar(64) DEFAULT NULL,
  `d_deleted_at` timestamp NULL DEFAULT NULL,
  `c_deleted_by` varchar(16) DEFAULT NULL,
  `n_deleted_by` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`i_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- db_document_dev.t_m_log definition

CREATE TABLE `t_m_log` (
  `i_activity` int(11) NOT NULL AUTO_INCREMENT,
  `c_activity_code` varchar(16) NOT NULL,
  `c_activity_name` varchar(64) NOT NULL,
  `c_note` varchar(64) DEFAULT NULL,
  `c_group_activity` varchar(64) DEFAULT NULL,
  `c_status` varchar(1) NOT NULL DEFAULT 'A',
  `c_status_name` varchar(64) NOT NULL DEFAULT 'ACTIVE',
  `d_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `c_created_by` varchar(16) DEFAULT NULL,
  `n_created_by` varchar(64) DEFAULT NULL,
  `d_updated_at` timestamp NULL DEFAULT NULL,
  `c_updated_by` varchar(16) DEFAULT NULL,
  `n_updated_by` varchar(64) DEFAULT NULL,
  `d_deleted_at` timestamp NULL DEFAULT NULL,
  `c_deleted_by` varchar(16) DEFAULT NULL,
  `n_deleted_by` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`i_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- db_document_dev.t_m_setting definition

CREATE TABLE `t_m_setting` (
  `i_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_setting_code` varchar(16) NOT NULL,
  `c_setting_name` varchar(64) NOT NULL,
  `e_setting` varchar(64) NOT NULL,
  `c_setting_group` varchar(64) NOT NULL,
  `c_desc` text NOT NULL,
  `c_status` varchar(1) NOT NULL DEFAULT 'A',
  `c_status_name` varchar(64) NOT NULL DEFAULT 'ACTIVE',
  `d_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `c_created_by` varchar(16) DEFAULT NULL,
  `n_created_by` varchar(64) DEFAULT NULL,
  `d_updated_at` timestamp NULL DEFAULT NULL,
  `c_updated_by` varchar(16) DEFAULT NULL,
  `n_updated_by` varchar(64) DEFAULT NULL,
  `d_deleted_at` timestamp NULL DEFAULT NULL,
  `c_deleted_by` varchar(16) DEFAULT NULL,
  `n_deleted_by` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`i_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- db_document_dev.t_m_user definition

CREATE TABLE `t_m_user` (
  `i_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_code` varchar(16) NOT NULL,
  `c_group_code` varchar(16) NOT NULL,
  `c_email` varchar(100) NOT NULL,
  `e_password` varchar(256) NOT NULL,
  `c_knowing_password` varchar(64) DEFAULT NULL,
  `c_first_name` varchar(64) NOT NULL,
  `c_last_name` varchar(64) DEFAULT NULL,
  `c_phone_number` varchar(64) DEFAULT NULL,
  `c_status` varchar(1) NOT NULL DEFAULT 'A',
  `c_status_name` varchar(64) NOT NULL DEFAULT 'ACTIVE',
  `d_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `c_created_by` varchar(16) DEFAULT NULL,
  `n_created_by` varchar(64) DEFAULT NULL,
  `d_updated_at` timestamp NULL DEFAULT NULL,
  `c_updated_by` varchar(16) DEFAULT NULL,
  `n_updated_by` varchar(64) DEFAULT NULL,
  `d_deleted_at` timestamp NULL DEFAULT NULL,
  `c_deleted_by` varchar(16) DEFAULT NULL,
  `n_deleted_by` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`i_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;