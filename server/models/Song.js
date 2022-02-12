module.exports = (sequelize, Sequelize) => {
  const Song = sequelize.define("songs", {
    title: {
      type: Sequelize.STRING,
    },
    artist: { type: Sequelize.STRING },

    album: {
      type: Sequelize.STRING,
    },
    genre: {
      type: Sequelize.STRING,
    },
    albumImageUrl: {
      type: Sequelize.STRING,
    },
    youtubeId: {
      type: Sequelize.STRING,
    },
    tab: {
      type: Sequelize.TEXT,
    },
    lyrics: {
      type: Sequelize.TEXT,
    },
  });
  return Song;
};
