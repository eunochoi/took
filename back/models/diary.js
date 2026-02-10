module.exports = (sequelize, DataTypes) => {
  const Diary = sequelize.define('diary', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    emotion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        is: /^\d{4}-\d{2}-\d{2}$/
      }
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  });

  Diary.associate = (db) => {
    db.Diary.belongsTo(db.User);
    db.Diary.hasMany(db.Image);
    db.Diary.belongsToMany(db.Habit, {
      through: 'DiaryHabit'
    });
  };

  return Diary;
}