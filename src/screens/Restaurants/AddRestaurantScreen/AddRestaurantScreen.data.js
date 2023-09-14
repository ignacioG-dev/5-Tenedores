import * as Yup from "yup";

export function initialValue(){
    return {
        name: "",
        address: "",
        phone: "",
        email: "",
        description: "",
        location: null,
        images: [],
    };
}

export function validationSchema() {
    return Yup.object ({
        name: Yup.string().required("Nombre obligatorio"),
        address: Yup.string().required("Dirección obligatoria"),
        phone: Yup.string().required("Número obligatorio"),
        email: Yup.string().email("No es un email valido").required("Email obligatorio"),
        description: Yup.string().required("Descripcion obligatorio"),
        location: Yup.object().required("La localizacion es requerida"),
        images: Yup.array().min(1, "Se requiere una imagen como mínimo").required("La imagen es requerida"),
    })
}