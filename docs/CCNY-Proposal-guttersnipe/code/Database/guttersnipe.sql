

DROP TABLE IF EXISTS `Location`;
CREATE TABLE `Location` (
`id`   mediumint(8) unsigned NOT NULL auto_increment,
`lat`  decimal(12, 9) default NULL,
`lng`  decimal(12, 9) default NULL,
`name` varchar(30)    default NULL,
`datetime` date default NULL,
`address` varchar(80) default NULL,
`type` enum('dumpster', 'building', 'land') default NULL,
  PRIMARY KEY (`id`),
) ENGINE = MyISAM AUTO_INCREMENT = 1;


DROP TABLE IF EXISTS `FREQUENCY`;
CREATE TABLE `FREQUENCY` (
bit(7)  weekdays,
date startTime,
int hrsDuration
) ENGINE = MyISAM AUTO_INCREMENT = 1;

--
-- Resource Types
--

DROP TABLE IF EXISTS `ChainStore`;
CREATE TABLE `ChainStore` (
varchar(42) name,
varchar(42) url

,
) ENGINE = MyISAM AUTO_INCREMENT = 1;

DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
,
) ENGINE = MyISAM AUTO_INCREMENT = 1;

DROP TABLE IF EXISTS `foods`;
CREATE TABLE `foods` (
`type` enum('dairy', 'meat', 'produce', 'eggs', 'packaged', 'prepared') default NULL,
) ENGINE = MyISAM AUTO_INCREMENT = 1;


-- 

CREATE TABLE IF NOT EXISTS `reports` (
  `COMMENT_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `MOVIE_ID` int(10) unsigned NOT NULL,
  `COMMENT` text NOT NULL,
  `FLAGGED` tinyint(1) NOT NULL DEFAULT '0',
  `USER_ID` int(11) NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`COMMENT_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- To take care of registered users and admins
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `USER_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(25) NOT NULL,
  `PASSWORD` varchar(50) DEFAULT NULL,
  `ACCOUNT_TYPE` varchar(10) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE IF NOT EXISTS `userinfo` (
  `USER_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(80) NOT NULL,
  `FIRSTNAME` varchar(30) NOT NULL,
  `LASTNAME` varchar(30) NOT NULL,
  `SPAM_COUNT` tinyint(4) NOT NULL DEFAULT '0',
  `WARNINGS` tinyint(4) NOT NULL DEFAULT '0',
  `RATING_FLAGS` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;


