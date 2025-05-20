// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use image::imageops::FilterType; // Import for resizing filter
use image::GenericImage;
use image::GenericImageView;
use image::ImageError;
// Import for width and height
use image::{DynamicImage, Luma};
use qrcode::{EcLevel, QrCode, Version};
use std::path::PathBuf;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct QrOptions {
    pub content: String,
    pub path: String,
    pub level: String,
    pub size: u32,
    pub version: i16
}

#[tauri::command]
fn create_qr(options: QrOptions) -> Result<(), String>{
    // Convertir el nivel de string a EcLevel
    let ec_level = match options.level.to_uppercase().as_str() {
        "L" => EcLevel::L,
        "M" => EcLevel::M,
        "Q" => EcLevel::Q,
        "H" => EcLevel::H,
        _ => return Err(format!("Nivel de corrección de errores no válido: {}", options.level)),
    };


    // Mapear la versión opcional a Option<Version>
    let version;
    let code;
    
    if (1..=40).contains(&options.version) {
        version = Version::Normal(options.version);
        code = match QrCode::with_version(options.content.as_bytes(), version, ec_level) {
        Ok(code) => code,
        Err(err) => return Err(format!("Error al crear el código QR con nivel de corrección {:?}: {}", ec_level, err)),
    };
    } else {
        code = match QrCode::with_error_correction_level(options.content.as_bytes(), ec_level) {
        Ok(code) => code,
        Err(err) => return Err(format!("Error al crear el código QR con nivel de corrección {:?}: {}", ec_level, err)),
    };
    }

    // Renderizar la imagen con el tamaño especificado
    let image = code.render::<Luma<u8>>().max_dimensions(options.size, options.size).build();

    // Convertir la ruta a PathBuf
    let qr_path = PathBuf::from(&options.path);

    // Guardar la imagen en la ruta especificada
    match image.save(&qr_path) {
        Ok(_) => Ok(()),
        Err(ImageError::IoError(err)) => Err(format!("Error de E/S al guardar la imagen en '{}': {}", options.path, err)),
        Err(err) => Err(format!("Error al guardar la imagen en '{}': {}", options.path, err)),
    }
}

#[tauri::command]
fn qr_with_logo(
    content: String,
    logo_path: String,
    qr_path: String,
    version: i16,
    ec_level: String,
    qr_image_size: u32,
    logo_size: u32,
) -> Result<(), String> {
    // Choose the error correction level
    let qr_ec_level = match ec_level.to_lowercase().as_str() {
        "l" => EcLevel::L,
        "m" => EcLevel::M,
        "q" => EcLevel::Q,
        "h" => EcLevel::H,
        _ => return Err("Nivel de corrección de error inválido. Debe ser 'L', 'M', 'Q' o 'H'.".into()),
    };

    // Generate the QR code
    let qr_version;
    let qrcode;

    if (1..=40).contains(&version) {
        qr_version = Version::Normal(version);
        qrcode = match QrCode::with_version(content, qr_version, qr_ec_level) {
        Ok(code) => code,
        Err(err) => return Err(format!("Error al crear el código QR con nivel de corrección {:?}: {}", qr_ec_level, err)),
    };
    } else {
        qrcode = match QrCode::with_error_correction_level(content, qr_ec_level) {
        Ok(code) => code,
        Err(err) => return Err(format!("Error al crear el código QR con nivel de corrección {:?}: {}", qr_ec_level, err)),
    };
    }

    // Render the QR code to an image buffer
    let image = qrcode.render::<Luma<u8>>().build();

    // Open the logo image
    let logo_result = image::open(&logo_path);
    let logo = match logo_result {
        Ok(img) => img,
        Err(e) => return Err(format!("Error al abrir el logo: {}", e)),
    };

    // Resize the logo
    let resized_logo = logo.resize(logo_size, logo_size, FilterType::Lanczos3);

    // Convert the QR code image to DynamicImage for easier manipulation
    let mut combined_image = DynamicImage::ImageLuma8(image);

    // Calculate the position to center the logo
    let image_width = combined_image.width();
    let image_height = combined_image.height();
    let logo_width = resized_logo.width();
    let logo_height = resized_logo.height();

    let x = (image_width - logo_width) / 2;
    let y = (image_height - logo_height) / 2;

    // Copy the resized logo onto the QR code
    if let Err(e) = combined_image.copy_from(&resized_logo, x, y) {
        return Err(format!("Error al insertar el logo en el código QR: {}", e));
    }

    // Resize the final combined image if needed
    let final_image = if qr_image_size != image_width || qr_image_size != image_height {
        combined_image.resize(qr_image_size, qr_image_size, FilterType::Lanczos3)
    } else {
        combined_image
    };

    // Save the final image
    let save_result = final_image.save(&qr_path);
    match save_result {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Error al guardar la imagen final en '{}': {}", qr_path, e)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![create_qr, qr_with_logo])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
