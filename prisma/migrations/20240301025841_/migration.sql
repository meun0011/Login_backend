-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(150) NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    `password` VARCHAR(72) NOT NULL,
    `email` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NOT NULL,
    `Description` VARCHAR(150) NOT NULL,
    `status` ENUM('PENDING', 'DOING', 'DONE') NOT NULL DEFAULT 'PENDING',
    `due_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `teamID` INTEGER NOT NULL AUTO_INCREMENT,
    `teamName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`teamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamProject` (
    `teamID` INTEGER NOT NULL,
    `todoID` INTEGER NOT NULL,
    `Todo_id` INTEGER NOT NULL,

    PRIMARY KEY (`teamID`, `todoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamProject` ADD CONSTRAINT `TeamProject_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `Team`(`teamID`) ON DELETE RESTRICT ON UPDATE CASCADE;
