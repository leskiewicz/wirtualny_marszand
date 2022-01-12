-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 12 Sty 2022, 03:14
-- Wersja serwera: 10.4.6-MariaDB
-- Wersja PHP: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `marszand`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `galleries`
--

CREATE TABLE `galleries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `galleries`
--

INSERT INTO `galleries` (`id`, `name`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Galeria Wektora 1', 4, '2021-12-29 21:30:27', '2021-12-29 21:30:27'),
(2, 'Galeria Wektora 2', 4, '2021-12-29 21:30:42', '2021-12-29 21:30:42'),
(3, 'Pierwsza galeria Hotelu', 3, '2021-12-29 22:24:40', '2021-12-29 22:24:40'),
(4, 'Druga galeria hotelu', 3, '2022-01-12 01:32:21', '2022-01-12 01:32:21');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `pictureId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pictures`
--

CREATE TABLE `pictures` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `imageLocation` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `width` decimal(10,2) NOT NULL,
  `height` decimal(10,2) NOT NULL,
  `qrCodeLocation` varchar(255) DEFAULT NULL,
  `galleryId` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `pictures`
--

INSERT INTO `pictures` (`id`, `name`, `imageLocation`, `description`, `year`, `type`, `price`, `width`, `height`, `qrCodeLocation`, `galleryId`, `available`, `createdAt`, `updatedAt`) VALUES
(1, 'Obrazek z kotem', 'pictures/269938096_5290548540974002_4026137131105652842_n-1640816368393.jpeg', 'blah blah blah', 2200, 'Olej na p?ótnie', '100.00', '200.00', '200.00', 'qrcodes/cb3381cb-33af-4b32-91fc-304dd7830317.png', 2, 1, '2021-12-29 22:19:28', '2021-12-29 22:19:28'),
(2, 'Obrazek z kotem', 'pictures/269938096_5290548540974002_4026137131105652842_n-1640817255426.jpeg', 'blah blah blah', 2200, 'Olej na p?ótnie', '100.00', '200.00', '200.00', 'qrcodes/911b579d-2628-4561-9ab3-15837530202f.png', 3, 1, '2021-12-29 22:34:15', '2021-12-29 22:34:15'),
(3, 'Kolejny obraz', 'pictures/got-1641951759872.jpeg', 'Opis kolejnego obrazu', 2021, 'Olej na plotnie', '199.99', '40.00', '60.00', 'qrcodes/8589d942-3ead-4212-ad30-c9ffe7514bb8.png', 4, 1, '2022-01-12 01:42:40', '2022-01-12 01:42:40');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'ADMIN', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'ARTYSTA', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'HOTEL', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'KLIENT', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20211205202731-create-user.js'),
('20211205203332-create-role.js'),
('20211208170125-create-user-info.js'),
('20211208183950-create-gallery.js'),
('20211208184216-create-picture.js'),
('20211218235442-create-order.js');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `userinfos`
--

CREATE TABLE `userinfos` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `birthDate` datetime NOT NULL,
  `organisation` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `userinfos`
--

INSERT INTO `userinfos` (`id`, `firstName`, `lastName`, `city`, `address`, `phone`, `birthDate`, `organisation`, `description`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Szymon', 'Kurek', 'Address', 'Ul. Gliniana 62', '332111254', '1990-01-01 00:00:00', 'Beldam', 'Clandestine', 1, '2021-12-29 21:17:47', '2022-01-12 01:21:18'),
(2, 'Szymon', 'Keruke', 'Address', 'Ul. Gliniana 22', '332111254', '1990-01-01 00:00:00', NULL, NULL, 2, '2021-12-29 21:18:21', '2021-12-29 21:18:22'),
(3, 'Szymon', 'Keruke', 'Address', 'Ul. Gliniana 22', '332111254', '1990-01-01 00:00:00', NULL, NULL, 3, '2021-12-29 21:18:26', '2021-12-29 21:18:27'),
(4, 'Szymon', 'Keruke', 'Address', 'Ul. Gliniana 22', '332111254', '1990-01-01 00:00:00', NULL, NULL, 4, '2021-12-29 21:18:32', '2021-12-29 21:18:32');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 'szymon@gmail.com', '$2a$10$75hHEY3Br1WUveQCiL7QLul8l7GxeZO/CPublOub2PUdCP4utZlkK', 4, '2021-12-29 21:17:47', '2022-01-12 01:24:56'),
(2, 'adam@gmail.com', '$2a$10$n0iBM/HoBCAErEZMDGrDTOWp9t6//ny1El677YSAQq8.ybdf9Np.6', 2, '2021-12-29 21:18:21', '2021-12-29 21:18:22'),
(3, 'wiktor@gmail.com', '$2a$10$MTRmkAR4Qobe7U/be0f.ee9.RRjSVEiKUPaPnYj9droyaJtvWg5Ha', 3, '2021-12-29 21:18:26', '2021-12-29 21:18:27'),
(4, 'wektor@gmail.com', '$2a$10$ycMdGCyovWWRfNM12hHruOk0UXtwkIjrh73EmzpZL1PKBFkFmcbwq', 2, '2021-12-29 21:18:32', '2021-12-29 21:18:32');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `userinfos`
--
ALTER TABLE `userinfos`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `pictures`
--
ALTER TABLE `pictures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `userinfos`
--
ALTER TABLE `userinfos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
