const config = require('./index');

module.exports = {
  development: {
    storage: process.env.DB_FILE,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'postgresql://mysleepin_user:g2Xybfx14m7HaAixcXxkJ0jywW1m5ZwC@dpg-ct120prtq21c73eko0i0-a.virginia-postgres.render.com/mysleepin',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};