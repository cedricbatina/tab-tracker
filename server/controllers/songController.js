const models = require("../models");
const Song = models.song;
const User = models.user;

exports.getOneSong = (req, res, next) => {
  const id = req.params.id;
  Song.findOne({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    ],
    where: { id: id },
  })
    .then((data) => {
      res.status(200).json({ data, message: "song available in database!" });
    })
    .catch((error) => {
      res.status(404).json({
        error,
        message:
          "the song is no more available and migth available in the future!",
      });
    });
};

exports.getAllSongs = (req, res, next) => {
  const title = req.body.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Song.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    ],
    limit: 8,
    where: condition,
  })
    .then((songs) => {
      res.status(202).json({ songs });
    })
    .catch((error) => {
      res.status(405).json({ error, message: "something went wrong!" });
      console.log(error);
    });
  //next(); this has caused some 404 issues I spent time to try to fix
};
exports.onlySongsFromUser = (req, res, next) => {
  let userId = req.params.userId;
  Song.findAll({ where: { userId: userId } })
    .then((articles) => {
      res
        .status(212)
        .json({ articles, message: "Here are all the songs you posted!" });
    })
    .catch((error) => {
      res.status(403).json({ error, message: "something went wrong!" });
    });
};

exports.createSong = (req, res, next) => {
  if (!req.body.title) {
    return;
    res.status(400).json({ message: "Title field cannot be empty!" });
  }
  if (!req.body.artist) {
    return;
    res.status(401).json({ message: "Artist field cannot be empty!" });
  }
  if (!req.body.album) {
    res.status(400).json({ message: "Album field cannot be empty!" });
    return;
  }
  if (!req.body.genre) {
    res.status(400).json({ message: "Genre field cannot be empty!" });
    return;
  }
  const song = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
    albumImageUrl: req.body.albumImageUrl,
    youtubeId: req.body.youtubeId,
    tab: req.body.tab,
    lyrics: req.body.lyrics,
  };
  Song.create(song)
    .then((song) => {
      res.status(203).json({ song, message: "song successfully created!" });
      console.log(song);
    })
    .catch((error) => {
      res.status(404).json({ message: "could not create song!" });
      console.log(error);
    });
};

exports.updateSong = (req, res, next) => {
  const id = req.params.id;
  Song.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res
          .status(204)
          .json({ message: "your song has been updated successfully!" });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: "could not update the song!" });
    });
  next();
};

exports.deleteSong = (req, res, next) => {
  const id = req.params.id;
  Song.destroy({ where: { id: id } })
    .then(() => {
      res.status(202).json({ message: "The song has been deleted!" });
    })
    .catch((error) => {
      res.status(502).json({ error, message: "could not delete the song!" });
    });
};
exports.deleteAllSongs = (req, res, next) => {
  Song.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.status(200).json({ message: `${nums} + "songs have been deleted!"` });
    })
    .catch((error) => {
      res.status(404).json({ message: "something went wrong!", error });
    });
};
