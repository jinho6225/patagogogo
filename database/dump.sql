--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price, quantity) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;

\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Patagonia Capilene Cool Trail Shirt - Men's	3900	/images/Patagonia Capilene Cool Trail Shirt - Men's.jpeg	What feels like cotton yet has the wicking efficiency of polyester for running, biking, traveling or all of the above in the same day? The men's Patagonia Capilene Cool Trail shirt.	 Made of 4 oz. polyester spun jersey that has a soft feel, a light weight and Polygiene® permanent odor control so you stay welcome among friends at the end of the day, Raglan sleeve construction with underarm gussets provides chafe-free comfort and range of motion, Comfortable self-fabric scoop neck wicks moisture and won't bind, Locker loop makes it easy to hang dry, No tags at neck for itch-free comfort, Droptail hem keeps length in place under a harness or hipbelt even during movement, P-6 woven label at left-front hem
2	Patagonia P-6 Logo Responsibili-Tee T-Shirt - Men's	3500	/images/Patagonia P-6 Logo Responsibili-Tee T-Shirt - Men's.jpeg	Why buy any other T-shirt? When you purchase the comfy men's Patagonia P-6 Logo Responsibili-Tee t-shirt, you help divert 4.8 plastic bottles and 4.2 oz. of fabric scrap from the waste stream.	 Manufacturing processes cut landfill and incinerator waste and reduce the need for petroleum to make raw materials, Patagonia original artwork is screen printed with PVC- and phthalate-free inks, Comfortable taped shoulder seams allow the T-shirt to retain its fit, Fair Trade Certified™ sewing
3	Patagonia P-6 Logo Responsibili-Tee Long-Sleeve Shirt - Men's	4500	/images/Patagonia P-6 Logo Responsibili-Tee Long-Sleeve Shirt - Men's.jpeg	 Made from sturdy recycled cotton and post-consumer recycled polyester, the men's Patagonia LS P-6 Logo Responsibili-Tee long-sleeve shirt has taped shoulder seams for comfort and fit retention.	 Fabric reduces the need for petroleum to make raw materials and cuts landfill and incinerator waste, Patagonia original art is screen-printed using inks that are PVC- and phthalate-free, Fair Trade Certified™ sewing means this was made in a Fair Trade approved facility, which promotes safe working conditions and sustainable livelihoods, Made with 0.26 pounds of scrap fabric and 4.8 discarded bottles, Producing this 100% recycled long-sleeve T-shirt uses 96% less water and creates 45% less CO2 than a conventional cotton T-shirt
4	Patagonia Line Logo Ridge Pocket Responsibili-Tee T-Shirt - Men's	3900	/images/Patagonia Line Logo Ridge Pocket Responsibili-Tee T-Shirt - Men's.jpeg	 The men's Patagonia Line Logo Ridge Pocket Responsibili-Tee T-shirt is made from a comfortable and sturdy 50/50 blend of recycled cotton/postconsumer recycled polyester.	 Made with 0.26 pounds of scrap fabric and 4.8 discarded bottles; producing this 100% recycled tee uses 96% less water and creates 45% less CO2 than a conventional cotton tee, Recycled fabric reduces the need for petroleum to make raw materials, and cuts landfill and incinerator waste, Patagonia original art is screen-printed using inks that are PVC- and phthalate-free, Pocket at left holds valuables, Taped shoulder seams lend comfort and fit retention, Fair Trade Certified™ sewing means this was made in a Fair Trade approved facility, which promotes safe working conditions and sustainable livelihoods
5	Patagonia Organic Cotton Midweight Long-Sleeve Pocket T-Shirt - Men's	5900	/images/Patagonia Organic Cotton Midweight Long-Sleeve Pocket T-Shirt - Men's.jpeg	 Soft, comfortable and easy on the skin, the men's Patagonia Organic Cotton Midweight Pocket long-sleeve T-shirt is one you'll reach for season after season and year after year.	 Breathable, organically grown cotton knit jersey has a weight that feels substantial while remaining relaxed and supple, Set-in sleeve construction provides chafe-free comfort and helps preserve shoulder mobility, Whipstitch detailing on the sleeves and bottom hem increase durability for day after day wear, Patch pocket and straight hem goes with most every situation, from casual hangout to the workplace, Fair Trade Certified™ sewing means this was made in a Fair Trade approved facility, which promotes safe working conditions and sustainable livelihoods
6	Patagonia Fitz Roy Scope Responsibili-Tee T-Shirt - Men's	4500	/images/Patagonia Fitz Roy Scope Responsibili-Tee T-Shirt - Men's.jpeg	The Patagonia Fitz Roy Scope Responsibili-Tee is made with 100% recycled fabrics. It features a large, colorful Fitz Roy graphic on the back and a smaller mountain logo at left chest.	 Using recycled materials (including 0.26 lbs. of scrap fabric and 4.8 discarded bottles) reduces the petroleum needed to make raw material and cuts landfill/incinerator waste, Producing this 100% recycled T-shirt uses 96% less water and creates 45% less CO2 than a conventional cotton T-shirt, Taped shoulder seams for comfort and fit retention, Original artwork by Neil Hubert is screen-printed using inks that are PVC- and phthalate-free, Fair Trade Certified™ sewing means this was made in a Fair Trade approved facility, which promotes safe working conditions and sustainable livelihoods
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 1, false);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 1, false);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 12, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
