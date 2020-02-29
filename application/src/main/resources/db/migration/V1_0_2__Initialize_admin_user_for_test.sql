insert into user (`username`, `password`, `role`)
values ("shane", "$2a$10$jlHDliEn6Q.hTE3CZc/UduO2j6MOX/S3SaOCKyMnliAU3RgAEohAi", "ADMIN");

insert into level (`level`, `title`)
values (1, "Beginner");

insert into userlevel (`userID`, `levelID`)
values(1, 1);
