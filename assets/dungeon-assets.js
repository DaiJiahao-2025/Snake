/**
 * Dungeon Asset Generator
 * Generates 16-bit retro pixel art assets at runtime using HTML5 Canvas.
 */

const DungeonAssets = {
    // Cache for generated images
    cache: {},

    // Helper to create a canvas and context
    createCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        // Disable smoothing for pixel art
        ctx.imageSmoothingEnabled = false;
        return { canvas, ctx };
    },

    // Generate Floor Texture (Seamless Stone)
    generateFloor(size = 32) {
        if (this.cache.floor) return this.cache.floor;
        const { canvas, ctx } = this.createCanvas(size, size);

        // Base earthy color
        ctx.fillStyle = '#2c2725';
        ctx.fillRect(0, 0, size, size);

        // Random noise for texture
        for (let i = 0; i < size * size / 2; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? '#3a3532' : '#221f1d';
            ctx.fillRect(Math.floor(Math.random() * size), Math.floor(Math.random() * size), 1, 1);
        }

        // Stone cracks / irregular grid
        ctx.strokeStyle = '#1a1614';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Horizontal crack
        ctx.moveTo(0, size - 1);
        ctx.lineTo(size, size - 1);
        // Vertical crack segment
        ctx.moveTo(size - 1, 0);
        ctx.lineTo(size - 1, size);
        ctx.stroke();

        // Highlight top-left for 3D effect
        ctx.strokeStyle = '#4a4542';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size - 1, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, size - 1);
        ctx.stroke();

        this.cache.floor = canvas;
        return canvas;
    },

    // Generate Wall Texture (Bricks)
    generateWall(size = 32) {
        if (this.cache.wall) return this.cache.wall;
        const { canvas, ctx } = this.createCanvas(size, size);

        // Dark background
        ctx.fillStyle = '#1a1614';
        ctx.fillRect(0, 0, size, size);

        // Bricks
        const brickColor = '#5a5552';
        const brickHighlight = '#7a7572';
        const brickShadow = '#3a3532';
        const mortar = '#1a1614';

        const brickH = size / 4;

        for (let y = 0; y < size; y += brickH) {
            const offset = (y / brickH) % 2 === 0 ? 0 : size / 2;
            for (let x = -offset; x < size; x += size / 2) {
                // Brick body
                ctx.fillStyle = brickColor;
                ctx.fillRect(x + 1, y + 1, size / 2 - 2, brickH - 2);

                // Highlight
                ctx.fillStyle = brickHighlight;
                ctx.fillRect(x + 1, y + 1, size / 2 - 2, 1);
                ctx.fillRect(x + 1, y + 1, 1, brickH - 2);

                // Shadow
                ctx.fillStyle = brickShadow;
                ctx.fillRect(x + 1, y + brickH - 2, size / 2 - 2, 1);
                ctx.fillRect(x + size / 2 - 2, y + 1, 1, brickH - 2);
            }
        }

        this.cache.wall = canvas;
        return canvas;
    },

    // Generate Snake Head
    generateSnakeHead(size = 32, type = 'normal') {
        const key = `head_${type}`;
        if (this.cache[key]) return this.cache[key];
        const { canvas, ctx } = this.createCanvas(size, size);

        // Colors
        const primary = '#2ecc71'; // Green
        const secondary = '#27ae60'; // Darker green
        const eye = '#f1c40f'; // Gold

        // Shape (Approximated with pixels)
        // Head base
        ctx.fillStyle = primary;
        // Draw a "rounded" pixel shape
        const pixels = [
            "000011110000",
            "001111111100",
            "011111111110",
            "111221122111", // 2 marks eye spots
            "111221122111",
            "111111111111",
            "111111111111",
            "011111111110",
            "001111111100",
            "000111111000",
        ];

        const scale = size / 12;

        pixels.forEach((row, r) => {
            for (let c = 0; c < row.length; c++) {
                const char = row[c];
                if (char !== '0') {
                    const x = c * scale;
                    const y = r * scale;
                    if (char === '1') {
                        ctx.fillStyle = primary;
                        ctx.fillRect(x, y, scale, scale);
                        // Add some texture/scales
                        if ((r + c) % 2 === 0) {
                            ctx.fillStyle = secondary;
                            ctx.fillRect(x, y, scale, scale);
                        }
                    } else if (char === '2') {
                        ctx.fillStyle = eye;
                        ctx.fillRect(x, y, scale, scale);
                    }
                }
            }
        });

        // Eyes - Pupil
        ctx.fillStyle = '#000';
        ctx.fillRect(3.5 * scale, 3.5 * scale, scale / 2, scale);
        ctx.fillRect(7.5 * scale, 3.5 * scale, scale / 2, scale);

        // Tongue
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(5.5 * scale, 10 * scale, scale, scale * 2);

        this.cache[key] = canvas;
        return canvas;
    },

    // Generate Loot Item
    generateItem(type, size = 32) {
        const key = `item_${type}`;
        if (this.cache[key]) return this.cache[key];
        const { canvas, ctx } = this.createCanvas(size, size);

        const scale = size / 10;
        let palette = {};
        let pixelMap = [];

        if (type === 'potion_red') {
            palette = { '1': '#c0392b', '2': '#e74c3c', '3': '#ecf0f1', 'w': '#ecf0f1' };
            pixelMap = [
                "0000330000",
                "0000330000",
                "0001111000",
                "0011221100",
                "0112222110",
                "0112222110",
                "0112222110",
                "0111111110",
                "0011111100",
                "0001111000"
            ];
        } else if (type === 'coin') {
            palette = { '1': '#f39c12', '2': '#f1c40f', '3': '#fcebb6' };
            pixelMap = [
                "0001111000",
                "0011111100",
                "0112222110",
                "1122222211",
                "1122332211",
                "1122332211",
                "1122222211",
                "0112222110",
                "0011111100",
                "0001111000"
            ];
        } else if (type === 'potion_blue') {
            palette = { '1': '#2980b9', '2': '#3498db', '3': '#ecf0f1' }; // Blue variants
            pixelMap = [
                "0000330000",
                "0000330000",
                "0001111000",
                "0011221100",
                "0112222110",
                "0112222110",
                "0112222110",
                "0111111110",
                "0011111100",
                "0001111000"
            ];
        } else if (type === 'chest') {
            palette = { '1': '#8e44ad', '2': '#9b59b6', '3': '#f1c40f' }; // Purple chest
            pixelMap = [
                "0000000000",
                "0011111100",
                "0111221110",
                "0111331110", // 3 is latch
                "0111111110",
                "0122222210",
                "0122222210",
                "0111111110",
                "0000000000",
                "0000000000"
            ];
        }

        pixelMap.forEach((row, r) => {
            for (let c = 0; c < row.length; c++) {
                const char = row[c];
                if (char !== '0' && palette[char]) {
                    ctx.fillStyle = palette[char];
                    ctx.fillRect(c * scale, r * scale, scale, scale);
                }
            }
        });

        this.cache[key] = canvas;
        return canvas;
    }
};

window.DungeonAssets = DungeonAssets;
