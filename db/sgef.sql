create database sgef;
use sgef;

create table programas
(
  id_programa int primary key,
  nombre_programa varchar(100) not null unique,
  tipo_programa varchar(30) not null,
  duracion_programa varchar(10) not null,
  descripcion_programa varchar(200) not null
);

create table fichas (
  id_ficha int primary key auto_increment,
  codigo_ficha varchar(20) not null unique,
  cantidad_aprendices int not null,
  programacion_ficha varchar(200),
  competenciasProgramadas text default "",
  id_programa int
);

create table competencias
(
  id_competencia int primary key,
  nombre_competencia varchar(200) not null unique,
  tipo_ambiente varchar(100) not null
);

create table resultados
(
  id_resultado int primary key,
  nombre_resultado varchar(200) not null unique,
  horas_resultado int not null,
  trimestres varchar(20),
  id_competencia int
);

create table ambientes (
	id_ambiente int primary key auto_increment,
	nombre_ambiente varchar(100) not null,
  torre varchar(20) not null,
  piso int not null,
  capacidad int not null,
  tipo_ambiente varchar(20) not null,
  programacion_ambiente varchar(200)
);

create table instructores
(
  id_instructor int primary key not null,
  nombre_instructor varchar(200) not null,
  programas varchar(100) not null,
  tipo_contrato varchar(20) not null,
  horas_programadas int not null,
  programacion_instructor varchar(200) not null
);

create table actividades_aprendizaje (
	id_actividad int primary key auto_increment,
  codigo_actividad int unique,
  nombre_actividad varchar(200) unique,
	id_resultado int not null
);

create table actividades_proyecto (
	id_actividad int primary key auto_increment,
	nombre_actividad varchar(200) not null unique,
  fase_actividad varchar(30) not null,
  id_programa int
);

create table proyectos (
	id_proyecto int primary key auto_increment,
  codigo_proyecto int unique,
  nombre_proyecto varchar(200) unique,
  id_programa int
);

create table usuarios
(
  id_usuario int primary key,
  nombres_usuario varchar(50) not null,
  apellidos_usuario varchar(50) not null,
  correo varchar(50) not null,
  pass varchar(30) not null,
  rol int not null
);

create table eventos (
	id_evento int primary key auto_increment,
	hora_inicio varchar(10) not null,
  hora_fin varchar(10) not null,
  dia varchar(20) not null,
  fecha_creacion varchar not null,
  id_proyecto int,
  id_actividad_proyecto int,
  id_instructor int not null,
  id_ambiente int not null,
  id_ficha int not null,
  id_resultado int not null,
  id_autor int not null
);

alter table fichas
	add constraint fk_programa_fichas foreign key (id_programa) references programas (id_programa);

alter table proyectos
	add constraint fk_programa_proyectos foreign key (id_programa) references programas (id_programa);

alter table actividades_proyecto
	add constraint fk_programa_actividades_proyecto foreign key (id_programa) references programas (id_programa);

alter table competencias
	add constraint fk_programa_competencia foreign key (id_programa) references programas (id_programa);

alter table resultados
	add constraint fk_competencias_resultados foreign key (id_competencia) references competencias (id_competencia);

alter table actividades_aprendizaje
	add constraint fk_usuario_eventos foreign key (id_resultado) references resultados (id_resultado);

alter table eventos
	add constraint fk_resultado_eventos foreign key (id_resultado) references resultados (id_resultado);

alter table eventos
	add constraint fk_ambientes_eventos foreign key (id_ambiente) references ambientes (id_ambiente);

alter table eventos
	add constraint fk_instructores_eventos foreign key (id_instructor) references instructores (id_instructor);

alter table eventos
	add constraint fk_fichas_eventos foreign key (id_ficha) references fichas (id_ficha);

alter table eventos
	add constraint fk_usuarios_eventos foreign key (id_autor) references usuarios (id_usuario);
