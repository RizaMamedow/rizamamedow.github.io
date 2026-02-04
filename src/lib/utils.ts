
// Функция для определения типа URL и возврата правильного пути
export const getImageUrl = (url: string): string => {
    // Если URL начинается с http:// или https://, возвращаем как есть
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    
    // Если URL начинается с /, возвращаем как есть (абсолютный путь)
    if (url.startsWith('/')) {
        return url;
    }
    
    // Если это относительный путь, добавляем /
    return `/${url}`;
};

// Функция для предзагрузки изображений
export const preloadImages = async (urls: string[]): Promise<void> => {
    await Promise.all(
        urls.map(
            (src) =>
                new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = getImageUrl(src);
                    img.onload = img.onerror = () => resolve();
                }),
        ),
    );
};