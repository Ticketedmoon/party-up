DROP DATABASE partyupDB;
CREATE DATABASE partyupDB;

CREATE TABLE `user`
(
    `userID`   int(15) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) DEFAULT NULL,
    `password` varchar(60)  DEFAULT NULL,
    `role`     varchar(20)  DEFAULT NULL,
    PRIMARY KEY (`userID`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8;

CREATE TABLE `level`
(
  `levelID` int(15) NOT NULL AUTO_INCREMENT,
  `level` int(60) DEFAULT NULL,
  `title` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`levelID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `userlevel` (
  `userlevelID` int(15) NOT NULL AUTO_INCREMENT,
  `userID` int(15) DEFAULT NULL,
  `levelID` int(15) DEFAULT NULL,
  PRIMARY KEY (`userlevelID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
