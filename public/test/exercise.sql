--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: aritraaritra
--

CREATE TABLE tasks (
    description text NOT NULL,
    status boolean,
    id integer NOT NULL
);


ALTER TABLE tasks OWNER TO aritraaritra;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: aritraaritra
--

CREATE SEQUENCE tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tasks_id_seq OWNER TO aritraaritra;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aritraaritra
--

ALTER SEQUENCE tasks_id_seq OWNED BY tasks.id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: aritraaritra
--

ALTER TABLE ONLY tasks ALTER COLUMN id SET DEFAULT nextval('tasks_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: aritraaritra
--

COPY tasks (description, status, id) FROM stdin;
Go Running	f	636
Buy groceries	f	637
Wash clothes	f	638
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aritraaritra
--

SELECT pg_catalog.setval('tasks_id_seq', 638, true);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: aritraaritra
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

