Usuario


CREATE USER 'sacim'@'localhost' IDENTIFIED BY 'DATABASE$*b123Pas456abc';
GRANT PRIVILEGE ON sacimdatabase TO 'username'@'localhost';
GRANT PRIVILEGE ON servidorfinal TO 'username'@'localhost';
GRANT ALL PRIVILEGES ON servidorfinal.* TO 'sacim'@'localhost';

GRANT ALL PRIVILEGES ON sacimdatabase.* TO 'sacim'@'localhost';



mysql -u root -p


create database sacimdatabase;


SELECT user, host FROM mysql.user WHERE user = 'sacim';


