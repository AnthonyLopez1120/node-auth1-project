
exports.seed = function(knex) {
  return knex('users').insert([
        {
          username: 'admin',
          password: 'admin_pw'
        },
        {
          username: 'user1',
          password: "user1_pw"
        },
      {
        username: 'user2',
        password: "user2_pw"
      }
      ]);
};
