// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use image::imageops::FilterType; // Import for resizing filter
use image::GenericImage;
use image::GenericImageView;
use image::{ImageBuffer}; // Ya no necesitamos RgbaImage si solo trabajamos con Luma
use image::png::PngEncoder; 
// Import for width and height
use image::{DynamicImage, Luma};
use qrcode::{EcLevel, QrCode, Version};
use serde::{Serialize, Deserialize};
use base64;
use std::io::Cursor;
use std::path::PathBuf;
use image::ImageError;
// Estructura para las opciones de entrada del QR
#[derive(Deserialize)]
pub struct QrOptions {
    pub content: String,
    pub level: String,
    pub size: u32,
    pub version: i16,
}

#[derive(Deserialize)]
pub struct QrLogoOptions {
    pub content: String,
    pub logo_path: String,
    pub version: i16,
    pub ec_level: String,
    pub qr_image_size: u32,
    pub logo_size: u32,
}

#[derive(Deserialize)]
pub struct QrLogoSaveOptions {
    pub content: String,
    pub logo_path: String,
    pub qr_path: String, // La ruta de guardado es específica para el guardado
    pub version: i16,
    pub ec_level: String,
    pub qr_image_size: u32,
    pub logo_size: u32,
}

// Estructura para la respuesta de la vista previa del QR
#[derive(Serialize)]
pub struct QrPreview {
    pub data_url: String, // Contendrá la imagen en formato Data URL (base64)
}

// Estructura para las opciones de guardado, ahora separadas
#[derive(Deserialize)]
pub struct QrSaveOptions {
    pub content: String, // Contenido para regenerar el QR al guardar
    pub path: String,
    pub level: String,
    pub size: u32,
    pub version: i16,
}


fn generate_qr_with_logo_image(options: &QrLogoOptions) -> Result<DynamicImage, String> {
    // Convertir el nivel de string a EcLevel
    let qr_ec_level = match options.ec_level.to_lowercase().as_str() {
        "l" => EcLevel::L,
        "m" => EcLevel::M,
        "q" => EcLevel::Q,
        "h" => EcLevel::H,
        _ => return Err("Nivel de corrección de error inválido. Debe ser 'L', 'M', 'Q' o 'H'.".into()),
    };

    // Generar el código QR
    let qrcode = if (1..=40).contains(&options.version) {
        let qr_version = Version::Normal(options.version);
        match QrCode::with_version(options.content.as_bytes(), qr_version, qr_ec_level) {
            Ok(code) => code,
            Err(err) => return Err(format!("Error al crear el código QR con versión y nivel de corrección {:?}: {}", qr_ec_level, err)),
        }
    } else {
        match QrCode::with_error_correction_level(options.content.as_bytes(), qr_ec_level) {
            Ok(code) => code,
            Err(err) => return Err(format!("Error al crear el código QR con nivel de corrección {:?}: {}", qr_ec_level, err)),
        }
    };

    // Renderizar el código QR a un ImageBuffer
    // La renderización inicial puede ser a un tamaño más pequeño y luego escalamos la imagen combinada
    let qr_buffer = qrcode.render::<Luma<u8>>().build();

    // Abrir la imagen del logo
    let logo = image::open(&options.logo_path)
        .map_err(|e| format!("Error al abrir el logo desde '{}': {}", options.logo_path, e))?;

    // Redimensionar el logo
    let resized_logo = logo.resize(options.logo_size, options.logo_size, FilterType::Lanczos3);

    // Convertir la imagen QR a DynamicImage para facilitar la manipulación (copiar el logo)
    let mut combined_image = DynamicImage::ImageLuma8(qr_buffer);

    // Calcular la posición para centrar el logo
    let image_width = combined_image.width();
    let image_height = combined_image.height();
    let logo_width = resized_logo.width();
    let logo_height = resized_logo.height();

    let x = (image_width.saturating_sub(logo_width)) / 2; // Usar saturating_sub para evitar underflow si el logo es más grande
    let y = (image_height.saturating_sub(logo_height)) / 2;

    // Copiar el logo redimensionado sobre el código QR
    if let Err(e) = combined_image.copy_from(&resized_logo, x, y) {
        return Err(format!("Error al insertar el logo en el código QR: {}", e));
    }

    // Redimensionar la imagen combinada final al tamaño deseado del QR
    let final_image = if options.qr_image_size != image_width || options.qr_image_size != image_height {
        combined_image.resize(options.qr_image_size, options.qr_image_size, FilterType::Lanczos3)
    } else {
        combined_image
    };

    Ok(final_image)
}


#[tauri::command]
fn preview_qr_with_logo(options: QrLogoOptions) -> Result<QrPreview, String> {
    let final_image = generate_qr_with_logo_image(&options)?;

    // Para la vista previa, vamos a codificar la imagen en base64 como un PNG
    let mut buffer = Vec::new();
    let mut cursor = Cursor::new(&mut buffer);

    // DynamicImage tiene un método write_to, que es más conveniente aquí
    // El formato de salida será el mismo que el del DynamicImage
    match final_image.write_to(&mut cursor, image::ImageFormat::Png) {
        Ok(_) => {
            let base64_image = base64::encode(&buffer);
            let data_url = format!("data:image/png;base64,{}", base64_image);
            Ok(QrPreview { data_url })
        },
        Err(err) => Err(format!("Error al codificar la imagen para vista previa: {}", err)),
    }
}

/// Función auxiliar para generar el código QR y la imagen.
/// Devolverá el ImageBuffer directamente para ser flexible.
fn generate_qr_image(options: &QrOptions) -> Result<ImageBuffer<Luma<u8>, Vec<u8>>, String> {
    let ec_level = match options.level.to_uppercase().as_str() {
        "L" => EcLevel::L,
        "M" => EcLevel::M,
        "Q" => EcLevel::Q,
        "H" => EcLevel::H,
        _ => return Err(format!("Nivel de corrección de errores no válido: {}", options.level)),
    };

    let code = if (1..=40).contains(&options.version) {
        let version = Version::Normal(options.version);
        match QrCode::with_version(options.content.as_bytes(), version, ec_level) {
            Ok(code) => code,
            Err(err) => return Err(format!("Error al crear el código QR con versión y nivel de corrección {:?}: {}", ec_level, err)),
        }
    } else {
        match QrCode::with_error_correction_level(options.content.as_bytes(), ec_level) {
            Ok(code) => code,
            Err(err) => return Err(format!("Error al crear el código QR con nivel de corrección {:?}: {}", ec_level, err)),
        }
    };

    Ok(code.render::<Luma<u8>>().max_dimensions(options.size, options.size).build())
}

#[tauri::command]
fn preview_qr(options: QrOptions) -> Result<QrPreview, String> {
      let image = generate_qr_image(&options)?;

    let mut buffer = Vec::new();
    let mut cursor = Cursor::new(&mut buffer);

    let encoder = PngEncoder::new(&mut cursor);
    match encoder.encode(
        image.as_raw(), // ¡Aquí está la corrección! Usar .as_raw()
        image.width(),
        image.height(),
        image::ColorType::L8
    ) {
        Ok(_) => {
            let base64_image = base64::encode(&buffer);
            let data_url = format!("data:image/png;base64,{}", base64_image);
            Ok(QrPreview { data_url })
        },
        Err(err) => Err(format!("Error al codificar la imagen para vista previa: {}", err)),
    }

}

#[tauri::command]
fn save_qr_with_logo(options: QrLogoSaveOptions) -> Result<(), String> {
    // Convertir QrLogoSaveOptions a QrLogoOptions para usar la función auxiliar
    let qr_logo_options = QrLogoOptions {
        content: options.content,
        logo_path: options.logo_path,
        version: options.version,
        ec_level: options.ec_level,
        qr_image_size: options.qr_image_size,
        logo_size: options.logo_size,
    };

    let final_image = generate_qr_with_logo_image(&qr_logo_options)?;

    // Guardar la imagen final
    let qr_path = PathBuf::from(&options.qr_path);
    match final_image.save(&qr_path) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Error al guardar la imagen final en '{}': {}", options.qr_path, e)),
    }
}

#[tauri::command]
fn save_qr(options: QrSaveOptions) -> Result<(), String> {
    // Regenerar la imagen usando QrOptions desde QrSaveOptions
    let qr_options = QrOptions {
        content: options.content,
        level: options.level,
        size: options.size,
        version: options.version,
    };
    let image = generate_qr_image(&qr_options)?;

    // Convertir la ruta a PathBuf
    let qr_path = PathBuf::from(&options.path);

    // Guardar la imagen en la ruta especificada
    match image.save(&qr_path) {
        Ok(_) => Ok(()),
        Err(ImageError::IoError(err)) => Err(format!("Error de E/S al guardar la imagen en '{}': {}", options.path, err)),
        Err(err) => Err(format!("Error al guardar la imagen en '{}': {}", options.path, err)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![preview_qr, preview_qr_with_logo, save_qr_with_logo, save_qr])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
