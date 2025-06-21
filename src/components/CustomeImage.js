 import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import singleExplosionProfessional from '../images/website eye pics/Single explosion professional.jpg'
import DuoExplosionProfessional from '../images/website eye pics/Duo explosion professional.jpg'
import TrioExplosionProfessional from '../images/website eye pics/Trio explosion professional.jpg'
import QuadrupleExplosionProfessional from '../images/website eye pics/Quadruple explosion professional.jpg'

import singleExplosionStandard from '../images/website eye pics/Single explosion.jpg'
import DuoExplosionStandard from '../images/website eye pics/Duo explosion.jpg'
import TrioExplosionStandard from '../images/website eye pics/Trio explosion.jpg'
import QuadrupleExplosionStandard from '../images/website eye pics/Quadruple explosion.jpg'

import singlePureProfessional from '../images/website eye pics/Single pure professional.jpg'
import DuoPureProfessional from '../images/website eye pics/Duo pure professional.jpg'
import TrioPureProfessional from '../images/website eye pics/Trio pure professional.jpg'
import QuadruplePureProfessional from '../images/website eye pics/Quadruple pure professional.jpg'

import singlePureStandard from '../images/website eye pics/Single pure.jpg'
import DuoPureStandard from '../images/website eye pics/Duo pure.jpg'
import TrioPureStandard from '../images/website eye pics/Trio pure.jpg'
import QuadruplePureStandard from '../images/website eye pics/Quadruple pure.jpg'

// Halo effects
import singleHaloProfessional from '../images/website eye pics/Single halo professional.jpg';
import DuoHaloProfessional from '../images/website eye pics/Duo halo professional.jpg';
import TrioHaloProfessional from '../images/website eye pics/Trio halo professional.jpg';
import QuadrupleHaloProfessional from '../images/website eye pics/Quadruple halo. professional.jpg';

import singleHaloStandard from '../images/website eye pics/Single halo.jpg';
import DuoHaloStandard from '../images/website eye pics/Duo halo.jpg';
import TrioHaloStandard from '../images/website eye pics/Trio halo.jpg';
import QuadrupleHaloStandard from '../images/website eye pics/Quadruple halo.jpg';

// Dust effects
import singleDustProfessional from '../images/website eye pics/Single dust. professional.jpg';
import TrioDustProfessional from '../images/website eye pics/Trio dust professional.jpg';
import QuadrupleDustProfessional from '../images/website eye pics/Quadruple dust professional.jpg';

import singleDustStandard from '../images/website eye pics/Single dust.jpg';
import TrioDustStandard from '../images/website eye pics/Trio dust.jpg';
import QuadrupleDustStandard from '../images/website eye pics/Quadruple dust.jpg';

// Dust effects
import DuoYingYangProfessional from '../images/website eye pics/Duo ying yang professional.jpg';
import DuoInfinityProfessional from '../images/website eye pics/Duo infinity. professional.jpg';
import DuoFusionProfessional from '../images/website eye pics/Duo fusion professional.jpg';


import DuoYingYangStandard from '../images/website eye pics/Duo ying yang.jpg';
import DuoInfinityStandard from '../images/website eye pics/Duo infinity.jpg';
import DuoInFusionStandard from '../images/website eye pics/Duo fusion.jpg';


const Images = [
    // Pure effects
    { eyeCount: 'One Person', effect: 'Pure effect', frame: 'Professional frame picture', image: singlePureProfessional },
    { eyeCount: 'One Person', effect: 'Pure effect', frame: 'Standard frame picture', image: singlePureStandard },
    { eyeCount: 'Two Person', effect: 'Pure effect', frame: 'Professional frame picture', image: DuoPureProfessional },
    { eyeCount: 'Two Person', effect: 'Pure effect', frame: 'Standard frame picture', image: DuoPureStandard },
    { eyeCount: 'Three Person', effect: 'Pure effect', frame: 'Professional frame picture', image: TrioPureProfessional },
    { eyeCount: 'Three Person', effect: 'Pure effect', frame: 'Standard frame picture', image: TrioPureStandard },
    { eyeCount: 'Four Person', effect: 'Pure effect', frame: 'Professional frame picture', image: QuadruplePureProfessional },
    { eyeCount: 'Four Person', effect: 'Pure effect', frame: 'Standard frame picture', image: QuadruplePureStandard },

    // Explosion effects
    { eyeCount: 'One Person', effect: 'Explosion effect', frame: 'Professional frame picture', image: singleExplosionProfessional },
    { eyeCount: 'One Person', effect: 'Explosion effect', frame: 'Standard frame picture', image: singleExplosionStandard },
    { eyeCount: 'Two Person', effect: 'Explosion effect', frame: 'Professional frame picture', image: DuoExplosionProfessional },
    { eyeCount: 'Two Person', effect: 'Explosion effect', frame: 'Standard frame picture', image: DuoExplosionStandard },
    { eyeCount: 'Three Person', effect: 'Explosion effect', frame: 'Professional frame picture', image: TrioExplosionProfessional },
    { eyeCount: 'Three Person', effect: 'Explosion effect', frame: 'Standard frame picture', image: TrioExplosionStandard },
    { eyeCount: 'Four Person', effect: 'Explosion effect', frame: 'Professional frame picture', image: QuadrupleExplosionProfessional },
    { eyeCount: 'Four Person', effect: 'Explosion effect', frame: 'Standard frame picture', image: QuadrupleExplosionStandard },

    // Halo effects
    { eyeCount: 'One Person', effect: 'Halo effect', frame: 'Professional frame picture', image: singleHaloProfessional },
    { eyeCount: 'One Person', effect: 'Halo effect', frame: 'Standard frame picture', image: singleHaloStandard },
    { eyeCount: 'Two Person', effect: 'Halo effect', frame: 'Professional frame picture', image: DuoHaloProfessional },
    { eyeCount: 'Two Person', effect: 'Halo effect', frame: 'Standard frame picture', image: DuoHaloStandard },
    { eyeCount: 'Three Person', effect: 'Halo effect', frame: 'Professional frame picture', image: TrioHaloProfessional },
    { eyeCount: 'Three Person', effect: 'Halo effect', frame: 'Standard frame picture', image: TrioHaloStandard },
    { eyeCount: 'Four Person', effect: 'Halo effect', frame: 'Professional frame picture', image: QuadrupleHaloProfessional },
    { eyeCount: 'Four Person', effect: 'Halo effect', frame: 'Standard frame picture', image: QuadrupleHaloStandard },

    // Dust effects
    { eyeCount: 'One Person', effect: 'Dust effect', frame: 'Professional frame picture', image: singleDustProfessional },
    { eyeCount: 'One Person', effect: 'Dust effect', frame: 'Standard frame picture', image: singleDustStandard },
    { eyeCount: 'Three Person', effect: 'Dust effect', frame: 'Professional frame picture', image: TrioDustProfessional },
    { eyeCount: 'Three Person', effect: 'Dust effect', frame: 'Standard frame picture', image: TrioDustStandard },
    { eyeCount: 'Four Person', effect: 'Dust effect', frame: 'Professional frame picture', image: QuadrupleDustProfessional },
    { eyeCount: 'Four Person', effect: 'Dust effect', frame: 'Standard frame picture', image: QuadrupleDustStandard },

    // Two Person effect images 
    { eyeCount: 'Two Person', effect: 'Yin Yang effect', frame: 'Professional frame picture', image: DuoYingYangProfessional },
    { eyeCount: 'Two Person', effect: 'Infinity effect effect', frame: 'Professional frame picture', image: DuoInfinityProfessional },
    { eyeCount: 'Two Person', effect: 'Fusion effect', frame: 'Professional frame picture', image: DuoFusionProfessional },


    { eyeCount: 'Two Person', effect: 'Infinity effect effect', frame: 'Standard frame picture', image: DuoInfinityStandard },
    { eyeCount: 'Two Person', effect: 'Yin Yang effect', frame: 'Standard frame picture', image: DuoYingYangStandard },
    { eyeCount: 'Two Person', effect: 'Fusion effect', frame: 'Standard frame picture', image: DuoInFusionStandard },

];

const prices = [
    { product: "One Person", size: "20cmx20cm", frame: "Standard frame picture", price: 9500 },
    { product: "One Person", size: "30cmx30cm", frame: "Standard frame picture", price: 12000 },
    { product: "One Person", size: "30cmx30cm", frame: "Professional frame picture", price: 16500 },
    { product: "One Person", size: "40cmx40cm", frame: "Standard frame picture", price: 17000 },
    { product: "One Person", size: "40cmx40cm", frame: "Professional frame picture", price: 19000 },
    { product: "One Person", size: "50cmx50cm", frame: "Professional frame picture", price: 21000 },

    { product: "Two Person", size: "20cmx20cm", frame: "Standard frame picture", price: 12000 },
    { product: "Two Person", size: "30cmx30cm", frame: "Standard frame picture", price: 14500 },
    { product: "Two Person", size: "30cmx30cm", frame: "Professional frame picture", price: 17500 },
    { product: "Two Person", size: "40cmx40cm", frame: "Standard frame picture", price: 19000 },
    { product: "Two Person", size: "40cmx40cm", frame: "Professional frame picture", price: 23000 },
    { product: "Two Person", size: "50cmx50cm", frame: "Professional frame picture", price: 26000 },

    { product: "Three Person", size: "20cmx20cm", frame: "Standard frame picture", price: 15000 },
    { product: "Three Person", size: "30cmx30cm", frame: "Standard frame picture", price: 17500 },
    { product: "Three Person", size: "30cmx30cm", frame: "Professional frame picture", price: 20500 },
    { product: "Three Person", size: "40cmx40cm", frame: "Standard frame picture", price: 23000 },
    { product: "Three Person", size: "40cmx40cm", frame: "Professional frame picture", price: 28000 },
    { product: "Three Person", size: "50cmx50cm", frame: "Professional frame picture", price: 32500 },

    { product: "Four Person", size: "20cmx20cm", frame: "Standard frame picture", price: 18500 },
    { product: "Four Person", size: "30cmx30cm", frame: "Standard frame picture", price: 23000 },
    { product: "Four Person", size: "30cmx30cm", frame: "Professional frame picture", price: 28000 },
    { product: "Four Person", size: "40cmx40cm", frame: "Standard frame picture", price: 32000 },
    { product: "Four Person", size: "40cmx40cm", frame: "Professional frame picture", price: 36000 },
    { product: "Four Person", size: "50cmx50cm", frame: "Professional frame picture", price: 42000 }
];

const getSizeDimensions = (size) => {
    switch (size) {
        case '20cmx20cm':
            return { width: '200px', height: '200px' };
        case '30cmx30cm':
            return { width: '300px', height: '300px' };
        case '40cmx40cm':
            return { width: '400px', height: '400px' };
        case '50cmx50cm':
            return { width: '500px', height: '500px' };
        case '60cmx60cm':
            return { width: '600px', height: '600px' };
        default:
            return { width: '300px', height: '300px' }; // Default size
    }
};

const CustomImage = ({ eyeCount, frame, size, effect, duoEffect }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImagePrice, setSelectedImagePrice] = useState(null);

    // Find the matching image based on the selected properties
    useEffect(() => {
        const matchedImage = Images.find(
            (img) => img.eyeCount === eyeCount && img.frame === frame && (duoEffect ? img.effect === duoEffect : img.effect === effect)
        );
        const findPrice = () => {
            const item = prices.find(p => p.product === eyeCount && p.size === size && p.frame === frame);
            return item ? " Rs. " + item.price + ".00" : "Out of Stock";
        };
        setSelectedImage(matchedImage)
        setSelectedImagePrice(findPrice())
    }, [eyeCount, frame, size, effect, duoEffect])

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            {selectedImage ? (
                <>
                    <Box
                        component="img"
                        src={selectedImage.image}
                        alt={`${effect} effect`}
                        sx={{ borderRadius: '3px', height: '400px' }}
                    />
                    <Typography variant="h6" sx={{ mb: 4, color: '#20638C' }}>
                        {selectedImagePrice}
                    </Typography>
                </>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        height: '400px', // Adjust height as needed
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px dashed #ccc',
                        backgroundColor: '#f9f9f9',
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body1" sx={{ color: '#777' }}>
                        Please select options.
                    </Typography>
                </Box>

            )}
        </Box>
    );
};

export default CustomImage;
