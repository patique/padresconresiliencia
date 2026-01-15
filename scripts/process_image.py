from PIL import Image

def crop_image(input_path, output_path, zoom_factor=1.05):
    with Image.open(input_path) as img:
        width, height = img.size
        
        # Calculate new dimensions (zoomed in)
        # Effectively we want to crop the outer edges to simulate a zoom
        # Calculating the crop box
        
        # Determine how much to crop from each side to keep aspect ratio
        # We want to remove the bottom watermark, so maybe just crop the bottom?
        # User asked for "zoom", which typically implies cropping all sides or maintaining center.
        # But specifically to remove watermark (usually bottom right).
        
        # Let's crop 5% from the bottom and 5% from the right to be safe?
        # Or a centered center crop of 90% of the image.
        
        new_width = width * (1 / zoom_factor)
        new_height = height * (1 / zoom_factor)
        
        left = (width - new_width) / 2
        top = (height - new_height) / 2
        right = (width + new_width) / 2
        bottom = (height + new_height) / 2
        
        # This performs a center crop, effectively zooming in.
        # The watermark is in the corner, so zooming in (cropping edges) will likely push it out if it's close to the edge.
        
        img_cropped = img.crop((left, top, right, bottom))
        img_cropped.save(output_path)
        print(f"Image cropped and saved to {output_path}")

crop_image('public/images/portada-mi-bebe-llora-original.jpg', 'public/images/portada-mi-bebe-llora.jpg', zoom_factor=1.1)
