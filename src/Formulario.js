import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Formulario = () => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	return (
	  <>
	  <Formik
	     initialValues={{
			nombre: '',
			correo: ''
		 }}
		 validate={(valores) => {
			let errores = {};

           //Validación nombre
			if (!valores.nombre){
				errores.nombre = 'Por favor ingresa tu nombre'
			} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
				errores.nombre = 'El nombre solo puede contener letras y espacios'
			}

			//Validación correo
			if (!valores.correo){
				errores.correo = 'Por favor ingresa tu correo electronico'
			} else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
				errores.correo = 'El correo solo puede contener letras, numeros, puntos, guion bajo y guiones'
			}
			return errores;
		 }}
	     onSubmit={(valores, {resetForm}) => {
			resetForm();
			console.log('Formulario Enviado');
			cambiarFormularioEnviado(true);
			setTimeout(() => cambiarFormularioEnviado(false), 3000);
		 }}
	  >
		 {( {errors} ) => (
            <Form className='formulario' >
				<div>
					<label htmlFor="nombre">Nombre</label>
					<Field
					type="text" 
					id="nombre" 
					name="nombre" 
					placeholder='Miguel Sanchez' 
				   />
				   <ErrorMessage name="nombre" component={() => (
					<div className='error'>{errors.nombre}</div> 
				   )} />
				</div>
				<div>
					<label htmlFor="correo">Correo</label>
					<Field 
					type="email" 
					id="correo" 
					name="correo" 
					placeholder='correo@correo.com' 
					/>
					 <ErrorMessage name="correo" component={() => (
					<div className='error'>{errors.correo}</div> 
				   )} />
				</div>

                 <div>
					<h5>Selecciona tu pais</h5>
                     <Field name="pais" as="select">
						<option value="Colombia">Colombia</option>
						<option value="Argentina">Argentina</option>
						<option value="Chile">Chile</option>
						<option value="Perú">Perú</option>
					 </Field>
				 </div>
                 <div>
				   <h5>Selecciona tu ciudad</h5>
                     <Field name="ciudades" as="select">
						<option value="bogotá">Bogotá</option>
						<option value="buenos aires">Buenos Aires</option>
						<option value="santiago de chile">Santiago de Chile</option>
						<option value="lima">Lima</option>
					 </Field>
				 </div>
				 <div>
                    <label>
						<Field type="radio" name="sexo" value="hombre"/> Hombre
				    </label>
					<label>
						<Field type="radio" name="sexo" value="mujer"/> Mujer
				    </label>
				 </div>

				 <div>
					<Field name="mansaje" as="textarea" placeholder="Escribe un mensaje"/>				
				 </div>

				<button type="submit">Enviar</button>
				{formularioEnviado && <p className='exito'>Enviado con exito!</p>}
			</Form>
			)}
		
	  </Formik>
	</>
  );
}
 
export default Formulario;