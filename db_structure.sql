USE infoHub; -- Replace 'your_database_name' with the actual name of your database

-- CREATE TABLE `users` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `email` varchar(255) DEFAULT NULL,
--   `password` varchar(255) NOT NULL,
--   `phone_number` varchar(20) DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `email` (`email`),
--   UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tokens` (
  `id` int NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  UNIQUE KEY `token_UNIQUE` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




