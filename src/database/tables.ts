const tables = {
  users: `
    CREATE TABLE IF NOT EXISTS users(
	    id INT AUTO_INCREMENT,
      name VARCHAR(100),
      password VARCHAR(255),
      email VARCHAR(100),
      PRIMARY KEY(id)
    )
  `
} as const;

export default tables;