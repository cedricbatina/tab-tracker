const models = require("../models");
const Song = models.song;

exports.getOneSong = (req, res, next) => {
  const id = req.params.id;
  Song.findOne({ where: { id: id } })
    .then((data) => {
      res.status(209).json({ data, message: "song available in database!" });
    })
    .catch((error) => {
      res.status(410).json({
        error,
        message:
          "the song is no more available and migth available in the future!",
      });
    })
    .next();
};

exports.getAllSongs = (req, res, next) => {
  const title = req.body.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Song.findAll({ where: condition })
    .then((songs) => {
      res.status(202).json({ songs });
    })
    .catch((error) => {
      error;
    });
  // next();
};

exports.createSong = (req, res, next) => {
  if (!req.body.title) {
    return;
    res.status(401).json({ message: "Title field cannot be empty!" });
  }
  if (!req.body.artist) {
    return;
    res.status(402).json({ message: "Title field cannot be empty!" });
  }
  if (!req.body.album) {
    res.status(403).json({ message: "Title field cannot be empty!" });
    return;
  }
  if (!req.body.genre) {
    res.status(405).json({ message: "Title field cannot be empty!" });
    return;
  }
  const song = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
    albumImageUrl: "",
    youtubeId: "",
    lyrics: "",
    tab: "",
  };
  Song.create(song)
    .then(() => {
      res.status(203).json({ message: "song successfully created!" });
    })
    .catch((error) => {
      res.status(408).json({ message: "could not create song!" });
    });

  next();
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
      res.status(408).json({ message: "could not update the song!" });
    })
    .next();
};

exports.deleteSong = (req, res, next) => {
  const id = req.params.id;
  Song.destroy({ where: { id: id } })
    .then(() => {
      res.status(209).json({ message: "The song has been deleted!" });
    })
    .catch((error) => {
      res.status(502).json({ error, message: "could not delete the song!" });
    });
  next();
};
