let isDragging = false;

    pixel.addEventListener('mousedown', () => {
      isDragging = true;
      pixel.style.backgroundColor = 'black';
    });

    pixel.addEventListener('mouseup', () => {
      isDragging = false;
    });

    pixel.addEventListener('mousemove', (event) => {
      if (isDragging) {
        pixel.style.backgroundColor = 'black';
      }
    });