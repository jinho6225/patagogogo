--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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
ALTER TABLE ONLY public.products2 DROP CONSTRAINT products2_pkey;
ALTER TABLE ONLY public.products1 DROP CONSTRAINT products1_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products2 ALTER COLUMN "product2Id" DROP DEFAULT;
ALTER TABLE public.products1 ALTER COLUMN "product1Id" DROP DEFAULT;
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP SEQUENCE public."products2_product2Id_seq";
DROP TABLE public.products2;
DROP SEQUENCE public."products1_product1Id_seq";
DROP TABLE public.products1;
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
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone bigint NOT NULL,
    "creditCard" text NOT NULL,
    "expirationDate" text NOT NULL,
    cvv integer NOT NULL,
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
-- Name: products1; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products1 (
    "product1Id" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products1_product1Id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products1_product1Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products1_product1Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products1_product1Id_seq" OWNED BY public.products1."product1Id";


--
-- Name: products2; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products2 (
    "product2Id" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products2_product2Id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products2_product2Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products2_product2Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products2_product2Id_seq" OWNED BY public.products2."product2Id";


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
-- Name: products1 product1Id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products1 ALTER COLUMN "product1Id" SET DEFAULT nextval('public."products1_product1Id_seq"'::regclass);


--
-- Name: products2 product2Id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products2 ALTER COLUMN "product2Id" SET DEFAULT nextval('public."products2_product2Id_seq"'::regclass);


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

CREATE TABLE "user"
(
    "email" text,
    "pwd" text,
    "createdAt" timestamp(6)
    with time zone DEFAULT now
    () NOT NULL
);
--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", "fullName", email, phone, "creditCard", "expirationDate", cvv, "shippingAddress", "createdAt") FROM stdin;
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
7	Patagonia Terrebonne Jogger Pants - Men's	7000	/images/Patagonia Terrebonne Jogger Pants - Men's.jpeg	 Run, boulder and transition from chaturanga to upward-facing dog with ease in the Patagonia Terrebonne Jogger pants, which feature a recycled polyester ripstop that breathes well and dries in a flash.	 Recycled polyester ripstop has a durable water repellent (DWR) to help water bead up and roll of, Articulated knees enhance mobility, Stretch-knit waistband adjusts with a drawcord, 2 drop-in front pockets and single rear zippered pocket, Lightweight, compressible fabric allows the pants to pack down into their own rear pocket, Reflective logo boosts visibility
8	Patagonia Performance Twill Jeans - Men's	9900	/images/Patagonia Performance Twill Jeans - Men's.jpeg	 Enjoy the comfort of jeans combined with the performance you would expect from technical outdoor clothing. Patagonia Performance Twill jeans shrug off water and pull moisture away from your skin.	 Made from solid-weft organic cotton and polyester T400 comfort stretch twill with a wicking finish that pulls moisture from the skin and repels water, Classic 5-pocket styling with antique nickel shank button closure, zip fly, double-needle belt loops, printed twill pocket bags and antique nickel piton rivets throughout, Pocket-edge seams are bound for a strong, clean finish; lower portions of both rear pockets are reinforced for durability, Fair Trade Certified sewing means the people who made these jeans earned a premium for their labor, Slim-straight fit sits on the waist with a regular rise, best for lean-to-medium builds, Not too loose or too tight through the seat and thighs; cut straight from the knees to the ankles
9	Patagonia Quandary Shorts - Men's 10 Inseam	6900	/images/Patagonia Quandary Shorts - Men's 10 Inseam.jpeg	 Made for the kinetics of backpacking and travel, the men's Patagonia Quandary shorts help you push through serious bushwhacking and unexpected stream crossings with stretchy, durable UPF 50+ fabric.	 Stretch fabric features a durable water repellent (DWR) finish and UPF 50+ sun protection, Curved waistband follows the natural shape of the hips and provides a contoured fit to help keep shorts in place during movement, Gusseted crotch allows full range of motion, 2 handwarmer pockets; right coin pocket; 2 rear pockets; right thigh pocket with zipper closure, Metal button closure with zip fly
10	Patagonia Skyline Traveler Pants - Men's	11900	/images/Patagonia Skyline Traveler Pants - Men's.jpeg	 For the all-day motion of going places—or when your plan for the day is to stay put, the men's Patagonia Skyline Traveler pants offer comfort to meet the demands of long-distance travel.	 Midweight fabric blend of recycled nylon, polyester and spandex offers 4-way stretch that feels soft and forgiving, Durable water repellent (DWR) finish resists moisture, spilled coffee and mud, Smooth waistband is designed for all-day comfort with an elasticized back, classic flat front and drawcord to personalize the fit, Gusseted crotch allows full range of hip and leg motion, Cuffs with flat fronts and elasticized backs keep the hems out of your way, 2 slanted front pockets, 2 welted rear zippered pockets and a zippered thigh pocket hold your phone and other small essentials, Fair Trade Certified™ sewing means this was made in a Fair Trade approved facility, which promotes safe working conditions and sustainable livelihoods
11	Patagonia Performance Straight Jeans - Men's	11900	/images/Patagonia Performance Straight Jeans - Men's.jpeg	 Built for your active lifestyle, the durable and midweight Patagonia Performance Straight jeans are made with a moisture-wicking, weather-resistant, organically grown cotton/polyester stretch blend.	 Easy-wearing mechanical stretch denim is made of 71% organically grown cotton/29% CoolMax® T400® polyester, Jeans are dyed with an innovative process to minimize water and energy use and carbon dioxide emissions compared to conventional dyeing processes, CoolMax increases mobility and moisture management, while a durable water repellent (DWR) finish sheds light moisture, Classic 5-pocket styling features 2 front pockets with printed twill pocket bags, a small coin pocket on the right hip and 2 rear pockets, Lower portions of the rear pockets are reinforced for durability; pocket-edge seams are bound for a strong, clean finish, Zip fly; antique-nickel shank-button closure, Double-needle belt loops and antique-nickel piton rivets throughout add durability, Cut with a regular rise to sit on the waist; best for lean-to-medium builds, the streamlined fit is neither too loose nor too tight through the seat and thighs, Straight-leg opening from knee to ankle, Fair Trade Certified™ sewn, which means the people who made these jeans earned a premium for their labor
12	Patagonia Stand Up Shorts - Men's	6900	/images/Patagonia Stand Up Shorts - Men's.jpeg	 Made with rugged cotton canvas, the men's 7 in. Patagonia Stand Up shorts offer up dirtbag-standard style, soft comfort and reliable durability for whatever life throws at you.	 Made with garment-washed, organically grown cotton canvas for softness and minimal shrinkage, Double-fabric seat provides abrasion resistance, Slanted front pockets, 2 rear pockets with hook-and-loop closures and an inset security pocket stash your must-haves, 7 in. inseam, Fair Trade Certified™ sewing means this was made in a Fair Trade approved facility, which promotes safe working conditions and sustainable livelihoods
13	Patagonia Arched Fitz Roy Bear Uprisal Crew Sweatshirt - Men's	6500	/images/Patagonia Arched Fitz Roy Bear Uprisal Crew Sweatshirt - Men's.jpeg	 It's typically not advised to go anywhere without your crew. But for those times you can't get the gang to hang, the men's Patagonia Arched Fitz Roy Bear Uprisal crew sweatshirt has got your back.	 This 95% recycled crew sweatshirt is made using 10.8 plastic bottles and almost 10 oz. of cotton scrap, saving 143 gal. of water compared to a conventional cotton sweatshirt, Champion-weight fabric with soft brushed back creates a classic heavyweight feel, Classic crew-neck pullover with a modern fit and just enough stretch, Screen print inks are PVC- and phthalate-free, Based on original art by Lance Rea
14	Patagonia P-6 Logo Uprisal Hoodie - Men's	6500	/images/Patagonia P-6 Logo Uprisal Hoodie - Men's.jpeg	 An oldie but a goodie, the men's Patagonia P-6 Logo Uprisal hoodie is constructed from champion-weight fabric with a soft brushed back to create that classic heavyweight feel.	 This 95% recycled hoodie is made using 14.9 plastic bottles and over 13 oz. of cotton scrap, saving 184 gal. of water compared to a conventional cotton hoodie, Classic pullover hoodie with a kangaroo-pouch handwarmer pocket, Screen print inks are PVC- and phthalate-free, Patagonia original art
15	Patagonia Trail Harbor Crew Sweatshirt - Men's	8900	/images/Patagonia Trail Harbor Crew Sweatshirt - Men's.jpeg	 With a classic go-anywhere look and an everyday feel, the men's Patagonia Trail Harbor Crew sweatshirt adds soft warmth when you're traveling to foreign cities or hanging out near home.	 Breathable French terry blend of hemp and organically grown cotton feels smooth on your skin, Clean crew-neck design features a rib-knit neck, hem and cuffs, Raglan sleeves allow full range of motion, Fair Trade Certified™ sewing, which means the people who made it earned a premium for their labor
16	Patagonia Better Sweater Quarter-Zip Pullover - Men's	9900	/images/Patagonia Better Sweater Quarter-Zip Pullover - Men's.jpeg	 With a sweater-knit outer face and soft fleece lining, the Patagonia men's Better Sweater Quarter-Zip Pullover offers bulk-free comfort and warmth for whatever activities you're checking off the list.	 Made from 100% recycled polyester fleece with sweater-knit face, fleece interior and heathered yarns for cozy, bulk-free comfort, Fleece is dyed with a low-impact process that significantly reduces the use of dyestuffs, energy and water compared to conventional dyeing methods, Flat-seam construction reduces bulk and helps eliminate seam chafe, Raglan sleeves enhance mobility and pack-wearing comfort, Zipper garage on the zip-through, stand-up collar provides next-to-skin softness, Micropolyester jersey trim on the armholes, hem and back of neck retain shape and resist abrasion, Headphone-compatible zippered left-chest pocket secures keys and cash, Fair trade certification promotes safe working conditions and sustainable livelihoods
17	Patagonia Micro D Snap-T Fleece Pullover - Men's	8900	/images/Patagonia Micro D Snap-T Fleece Pullover - Men's.jpeg	 A soft, warm layer for camping, hiking and everyday adventures, the men's Patagonia Micro D Snap-T fleece pullover is a cozy go-to—and doubles as a pillow on long overnighters.	 Micro D® 100% recycled polyester microfleece offers soft, light warmth; fleece acts as an insulated mid layer with a shell, or a stand-alone layer in moderate conditions, Features a nylon-reinforced front placket with 4 snaps for easy venting adjustments, Stand-up collar has 2 layers of fleece for added warmth, Y-Joint sleeves allow full range of shoulder mobility, Spandex trim at the cuffs and hem offers a smooth finish on exposed skin
18	Patagonia Cotton Quilt Snap-T Pullover - Men's	14900	/images/Patagonia Cotton Quilt Snap-T Pullover - Men's.jpeg	 Lightweight and limber, just the way you like to feel when you step onto the crag, the Patagonia Cotton Quilt Snap-T Pullover relishes early-morning belays or cool afternoons at the summit.	 Made with a soft organic cotton/polyester Jacquard knit fabric with lofty fill yarns of textured polyester for breathable, cozy warmth, 1-inch diamond quilting creates an effective heat-trapping surface and reduces bulk while increasing compressibility, Wide rib-knit cuffs and hem with spandex trim seal in warmth and retain shape, Doubled stand-up collar has a snap placket to block breezy weather, Generously cut arms with Y-joint sleeves allow unlimited shoulder mobility, Durable water repellent finish (DWR) resists light rain, Left-chest pocket with nylon flap and snap closure, Climbing cord hanging loop and inside contrast collar tape are brushed for softness
\.


--
-- Data for Name: products1; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products1 ("product1Id", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Patagonia Terrebonne Jogger Pants - Men's	7000	/images/Patagonia Terrebonne Jogger Pants - Men's.jpeg	 Run, boulder and transition from chaturanga to upward-facing dog with ease in the Patagonia Terrebonne Jogger pants, which feature a recycled polyester ripstop that breathes well and dries in a flash.	 Recycled polyester ripstop has a durable water repellent (DWR) to help water bead up and roll of, Articulated knees enhance mobility, Stretch-knit waistband adjusts with a drawcord, 2 drop-in front pockets and single rear zippered pocket, Lightweight, compressible fabric allows the pants to pack down into their own rear pocket, Reflective logo boosts visibility
2	Patagonia Performance Twill Jeans - Men's	9900	/images/Patagonia Performance Twill Jeans - Men's.jpeg	 Enjoy the comfort of jeans combined with the performance you would expect from technical outdoor clothing. Patagonia Performance Twill jeans shrug off water and pull moisture away from your skin.	 Made from solid-weft organic cotton and polyester T400 comfort stretch twill with a wicking finish that pulls moisture from the skin and repels water, Classic 5-pocket styling with antique nickel shank button closure, zip fly, double-needle belt loops, printed twill pocket bags and antique nickel piton rivets throughout, Pocket-edge seams are bound for a strong, clean finish; lower portions of both rear pockets are reinforced for durability, Fair Trade Certified sewing means the people who made these jeans earned a premium for their labor, Slim-straight fit sits on the waist with a regular rise, best for lean-to-medium builds, Not too loose or too tight through the seat and thighs; cut straight from the knees to the ankles
3	Patagonia Quandary Shorts - Men's 10 Inseam	6900	/images/Patagonia Quandary Shorts - Men's 10 Inseam.jpeg	 Made for the kinetics of backpacking and travel, the men's Patagonia Quandary shorts help you push through serious bushwhacking and unexpected stream crossings with stretchy, durable UPF 50+ fabric.	 Stretch fabric features a durable water repellent (DWR) finish and UPF 50+ sun protection, Curved waistband follows the natural shape of the hips and provides a contoured fit to help keep shorts in place during movement, Gusseted crotch allows full range of motion, 2 handwarmer pockets; right coin pocket; 2 rear pockets; right thigh pocket with zipper closure, Metal button closure with zip fly
4	Patagonia Skyline Traveler Pants - Men's	11900	/images/Patagonia Skyline Traveler Pants - Men's.jpeg	 For the all-day motion of going places—or when your plan for the day is to stay put, the men's Patagonia Skyline Traveler pants offer comfort to meet the demands of long-distance travel.	 Midweight fabric blend of recycled nylon, polyester and spandex offers 4-way stretch that feels soft and forgiving, Durable water repellent (DWR) finish resists moisture, spilled coffee and mud, Smooth waistband is designed for all-day comfort with an elasticized back, classic flat front and drawcord to personalize the fit, Gusseted crotch allows full range of hip and leg motion, Cuffs with flat fronts and elasticized backs keep the hems out of your way, 2 slanted front pockets, 2 welted rear zippered pockets and a zippered thigh pocket hold your phone and other small essentials, Fair Trade Certified™ sewing means this was made in a Fair Trade approved facility, which promotes safe working conditions and sustainable livelihoods
5	Patagonia Performance Straight Jeans - Men's	11900	/images/Patagonia Performance Straight Jeans - Men's.jpeg	 Built for your active lifestyle, the durable and midweight Patagonia Performance Straight jeans are made with a moisture-wicking, weather-resistant, organically grown cotton/polyester stretch blend.	 Easy-wearing mechanical stretch denim is made of 71% organically grown cotton/29% CoolMax® T400® polyester, Jeans are dyed with an innovative process to minimize water and energy use and carbon dioxide emissions compared to conventional dyeing processes, CoolMax increases mobility and moisture management, while a durable water repellent (DWR) finish sheds light moisture, Classic 5-pocket styling features 2 front pockets with printed twill pocket bags, a small coin pocket on the right hip and 2 rear pockets, Lower portions of the rear pockets are reinforced for durability; pocket-edge seams are bound for a strong, clean finish, Zip fly; antique-nickel shank-button closure, Double-needle belt loops and antique-nickel piton rivets throughout add durability, Cut with a regular rise to sit on the waist; best for lean-to-medium builds, the streamlined fit is neither too loose nor too tight through the seat and thighs, Straight-leg opening from knee to ankle, Fair Trade Certified™ sewn, which means the people who made these jeans earned a premium for their labor
6	Patagonia Stand Up Shorts - Men's	6900	/images/Patagonia Stand Up Shorts - Men's.jpeg	 Made with rugged cotton canvas, the men's 7 in. Patagonia Stand Up shorts offer up dirtbag-standard style, soft comfort and reliable durability for whatever life throws at you.	 Made with garment-washed, organically grown cotton canvas for softness and minimal shrinkage, Double-fabric seat provides abrasion resistance, Slanted front pockets, 2 rear pockets with hook-and-loop closures and an inset security pocket stash your must-haves, 7 in. inseam, Fair Trade Certified™ sewing means this was made in a Fair Trade approved facility, which promotes safe working conditions and sustainable livelihoods
\.


--
-- Data for Name: products2; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products2 ("product2Id", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Patagonia Arched Fitz Roy Bear Uprisal Crew Sweatshirt - Men's	6500	/images/Patagonia Arched Fitz Roy Bear Uprisal Crew Sweatshirt - Men's.jpeg	 It's typically not advised to go anywhere without your crew. But for those times you can't get the gang to hang, the men's Patagonia Arched Fitz Roy Bear Uprisal crew sweatshirt has got your back.	 This 95% recycled crew sweatshirt is made using 10.8 plastic bottles and almost 10 oz. of cotton scrap, saving 143 gal. of water compared to a conventional cotton sweatshirt, Champion-weight fabric with soft brushed back creates a classic heavyweight feel, Classic crew-neck pullover with a modern fit and just enough stretch, Screen print inks are PVC- and phthalate-free, Based on original art by Lance Rea
2	Patagonia P-6 Logo Uprisal Hoodie - Men's	6500	/images/Patagonia P-6 Logo Uprisal Hoodie - Men's.jpeg	 An oldie but a goodie, the men's Patagonia P-6 Logo Uprisal hoodie is constructed from champion-weight fabric with a soft brushed back to create that classic heavyweight feel.	 This 95% recycled hoodie is made using 14.9 plastic bottles and over 13 oz. of cotton scrap, saving 184 gal. of water compared to a conventional cotton hoodie, Classic pullover hoodie with a kangaroo-pouch handwarmer pocket, Screen print inks are PVC- and phthalate-free, Patagonia original art
3	Patagonia Trail Harbor Crew Sweatshirt - Men's	8900	/images/Patagonia Trail Harbor Crew Sweatshirt - Men's.jpeg	 With a classic go-anywhere look and an everyday feel, the men's Patagonia Trail Harbor Crew sweatshirt adds soft warmth when you're traveling to foreign cities or hanging out near home.	 Breathable French terry blend of hemp and organically grown cotton feels smooth on your skin, Clean crew-neck design features a rib-knit neck, hem and cuffs, Raglan sleeves allow full range of motion, Fair Trade Certified™ sewing, which means the people who made it earned a premium for their labor
4	Patagonia Better Sweater Quarter-Zip Pullover - Men's	9900	/images/Patagonia Better Sweater Quarter-Zip Pullover - Men's.jpeg	 With a sweater-knit outer face and soft fleece lining, the Patagonia men's Better Sweater Quarter-Zip Pullover offers bulk-free comfort and warmth for whatever activities you're checking off the list.	 Made from 100% recycled polyester fleece with sweater-knit face, fleece interior and heathered yarns for cozy, bulk-free comfort, Fleece is dyed with a low-impact process that significantly reduces the use of dyestuffs, energy and water compared to conventional dyeing methods, Flat-seam construction reduces bulk and helps eliminate seam chafe, Raglan sleeves enhance mobility and pack-wearing comfort, Zipper garage on the zip-through, stand-up collar provides next-to-skin softness, Micropolyester jersey trim on the armholes, hem and back of neck retain shape and resist abrasion, Headphone-compatible zippered left-chest pocket secures keys and cash, Fair trade certification promotes safe working conditions and sustainable livelihoods
5	Patagonia Micro D Snap-T Fleece Pullover - Men's	8900	/images/Patagonia Micro D Snap-T Fleece Pullover - Men's.jpeg	 A soft, warm layer for camping, hiking and everyday adventures, the men's Patagonia Micro D Snap-T fleece pullover is a cozy go-to—and doubles as a pillow on long overnighters.	 Micro D® 100% recycled polyester microfleece offers soft, light warmth; fleece acts as an insulated mid layer with a shell, or a stand-alone layer in moderate conditions, Features a nylon-reinforced front placket with 4 snaps for easy venting adjustments, Stand-up collar has 2 layers of fleece for added warmth, Y-Joint sleeves allow full range of shoulder mobility, Spandex trim at the cuffs and hem offers a smooth finish on exposed skin
6	Patagonia Cotton Quilt Snap-T Pullover - Men's	14900	/images/Patagonia Cotton Quilt Snap-T Pullover - Men's.jpeg	 Lightweight and limber, just the way you like to feel when you step onto the crag, the Patagonia Cotton Quilt Snap-T Pullover relishes early-morning belays or cool afternoons at the summit.	 Made with a soft organic cotton/polyester Jacquard knit fabric with lofty fill yarns of textured polyester for breathable, cozy warmth, 1-inch diamond quilting creates an effective heat-trapping surface and reduces bulk while increasing compressibility, Wide rib-knit cuffs and hem with spandex trim seal in warmth and retain shape, Doubled stand-up collar has a snap placket to block breezy weather, Generously cut arms with Y-joint sleeves allow unlimited shoulder mobility, Durable water repellent finish (DWR) resists light rain, Left-chest pocket with nylon flap and snap closure, Climbing cord hanging loop and inside contrast collar tape are brushed for softness
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 1, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 5, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 18, true);


--
-- Name: products1_product1Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products1_product1Id_seq"', 1, false);


--
-- Name: products2_product2Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products2_product2Id_seq"', 1, false);


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
-- Name: products1 products1_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products1
    ADD CONSTRAINT products1_pkey PRIMARY KEY ("product1Id");


--
-- Name: products2 products2_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products2
    ADD CONSTRAINT products2_pkey PRIMARY KEY ("product2Id");


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
