export async function uploadFiles(files) {
    const url = `https://api.cloudinary.com/v1_1/ddsuzqzgh/video/upload`;
    const uploadedData = []; // Array para almacenar la información de los archivos subidos

    const formData = new FormData();
    const videoBlob = new Blob([files.videoFile.data], { type: files.videoFile.mimetype });
    formData.append("file", videoBlob, files.videoFile.name);
    formData.append('upload_preset', 'videos_preset');
        
    try {
        const response = await fetch(url, {
            method: "post",
            body: formData
        });
            
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        uploadedData.push(data); // Agrega la información del archivo subido al array de datos
    } catch (error) {
        console.error("Error en la solicitud:", error);
        uploadedData.push(null); // Agrega null al array en caso de error
    }
    
    return uploadedData; // Devuelve el array de datos de los archivos subidos
}
