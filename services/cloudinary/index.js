export async function uploadFiles(files) {
    const url = `https://api.cloudinary.com/v1_1/ddsuzqzgh/video/upload`;
   
    if (files && files.videoFile) {
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
            return data; // Devuelve solo el objeto de datos
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return null; // Devuelve null en caso de error
        }
    } else {
        console.error("El objeto 'files' es null o no tiene la propiedad 'videoFile'");
        // Devuelve un valor apropiado en caso de que files sea null
        return null;
    }}
