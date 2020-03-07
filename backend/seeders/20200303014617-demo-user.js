"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "admin",
          email: "admin@admin.com",
          password:
            "$2b$10$kK53TiQDHUhCpVQ9tyoRGOZ0b7BUJgq4ibZ9nD3el0CQVYNbJ.3ca",
          level: "admin",
          gender: "male",
          phone: "081122334455",
          address: "jl. buntu",
          identity: "3505261236758001",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "agus",
          email: "agus@user.com",
          password:
            "$2b$10$pTqQpTheYJEAOKlxjfAIweTOE.FSGbrsN7AtiVroqVYSQSMkSA17m",
          level: "user",
          gender: "male",
          phone: "082333778899101",
          address: "jl. in aja",
          identity: "3456738290870001",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("People", null, {});
  }
};
