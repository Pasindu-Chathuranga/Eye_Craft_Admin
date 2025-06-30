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
    { eyeCount: 'Single iris - One person', effect: 'Pure effect', frame: 'Professional frame picture', image: singlePureProfessional },
    { eyeCount: 'Single iris - One person', effect: 'Pure effect', frame: 'Standard frame picture', image: singlePureStandard },
    { eyeCount: 'Duo iris - Two people', effect: 'Pure effect', frame: 'Professional frame picture', image: DuoPureProfessional },
    { eyeCount: 'Duo iris - Two people', effect: 'Pure effect', frame: 'Standard frame picture', image: DuoPureStandard },
    { eyeCount: 'Trio iris - Three people', effect: 'Pure effect', frame: 'Professional frame picture', image: TrioPureProfessional },
    { eyeCount: 'Trio iris - Three people', effect: 'Pure effect', frame: 'Standard frame picture', image: TrioPureStandard },
    { eyeCount: 'Quadruple iris - Four people', effect: 'Pure effect', frame: 'Professional frame picture', image: QuadruplePureProfessional },
    { eyeCount: 'Quadruple iris - Four people', effect: 'Pure effect', frame: 'Standard frame picture', image: QuadruplePureStandard },

    // Explosion effects
    { eyeCount: 'Single iris - One person', effect: 'Explosion effect', frame: 'Professional frame picture', image: singleExplosionProfessional },
    { eyeCount: 'Single iris - One person', effect: 'Explosion effect', frame: 'Standard frame picture', image: singleExplosionStandard },
    { eyeCount: 'Duo iris - Two people', effect: 'Explosion effect', frame: 'Professional frame picture', image: DuoExplosionProfessional },
    { eyeCount: 'Duo iris - Two people', effect: 'Explosion effect', frame: 'Standard frame picture', image: DuoExplosionStandard },
    { eyeCount: 'Trio iris - Three people', effect: 'Explosion effect', frame: 'Professional frame picture', image: TrioExplosionProfessional },
    { eyeCount: 'Trio iris - Three people', effect: 'Explosion effect', frame: 'Standard frame picture', image: TrioExplosionStandard },
    { eyeCount: 'Quadruple iris - Four people', effect: 'Explosion effect', frame: 'Professional frame picture', image: QuadrupleExplosionProfessional },
    { eyeCount: 'Quadruple iris - Four people', effect: 'Explosion effect', frame: 'Standard frame picture', image: QuadrupleExplosionStandard },

    // Halo effects
    { eyeCount: 'Single iris - One person', effect: 'Halo effect', frame: 'Professional frame picture', image: singleHaloProfessional },
    { eyeCount: 'Single iris - One person', effect: 'Halo effect', frame: 'Standard frame picture', image: singleHaloStandard },
    { eyeCount: 'Duo iris - Two people', effect: 'Halo effect', frame: 'Professional frame picture', image: DuoHaloProfessional },
    { eyeCount: 'Duo iris - Two people', effect: 'Halo effect', frame: 'Standard frame picture', image: DuoHaloStandard },
    { eyeCount: 'Trio iris - Three people', effect: 'Halo effect', frame: 'Professional frame picture', image: TrioHaloProfessional },
    { eyeCount: 'Trio iris - Three people', effect: 'Halo effect', frame: 'Standard frame picture', image: TrioHaloStandard },
    { eyeCount: 'Quadruple iris - Four people', effect: 'Halo effect', frame: 'Professional frame picture', image: QuadrupleHaloProfessional },
    { eyeCount: 'Quadruple iris - Four people', effect: 'Halo effect', frame: 'Standard frame picture', image: QuadrupleHaloStandard },

    // Dust effects
    { eyeCount: 'Single iris - One person', effect: 'Dust effect', frame: 'Professional frame picture', image: singleDustProfessional },
    { eyeCount: 'Single iris - One person', effect: 'Dust effect', frame: 'Standard frame picture', image: singleDustStandard },
    { eyeCount: 'Trio iris - Three people', effect: 'Dust effect', frame: 'Professional frame picture', image: TrioDustProfessional },
    { eyeCount: 'Trio iris - Three people', effect: 'Dust effect', frame: 'Standard frame picture', image: TrioDustStandard },
    { eyeCount: 'Quadruple iris - Four people', effect: 'Dust effect', frame: 'Professional frame picture', image: QuadrupleDustProfessional },
    { eyeCount: 'Quadruple iris - Four people', effect: 'Dust effect', frame: 'Standard frame picture', image: QuadrupleDustStandard },

    // Duo iris - Two people effect images 
    { eyeCount: 'Duo iris - Two people', effect: 'Yin Yang effect', frame: 'Professional frame picture', image: DuoYingYangProfessional },
    { eyeCount: 'Duo iris - Two people', effect: 'Infinity effect effect', frame: 'Professional frame picture', image: DuoInfinityProfessional },
    { eyeCount: 'Duo iris - Two people', effect: 'Fusion effect', frame: 'Professional frame picture', image: DuoFusionProfessional },


    { eyeCount: 'Duo iris - Two people', effect: 'Infinity effect effect', frame: 'Standard frame picture', image: DuoInfinityStandard },
    { eyeCount: 'Duo iris - Two people', effect: 'Yin Yang effect', frame: 'Standard frame picture', image: DuoYingYangStandard },
    { eyeCount: 'Duo iris - Two people', effect: 'Fusion effect', frame: 'Standard frame picture', image: DuoInFusionStandard },

];

const prices = [
    { product: "Single iris - One person", size: "20cmx20cm", frame: "Standard frame picture", price: 9500 },
    { product: "Single iris - One person", size: "30cmx30cm", frame: "Standard frame picture", price: 12000 },
    { product: "Single iris - One person", size: "30cmx30cm", frame: "Professional frame picture", price: 16500 },
    { product: "Single iris - One person", size: "40cmx40cm", frame: "Standard frame picture", price: 17000 },
    { product: "Single iris - One person", size: "40cmx40cm", frame: "Professional frame picture", price: 19000 },
    { product: "Single iris - One person", size: "50cmx50cm", frame: "Professional frame picture", price: 21000 },

    { product: "Duo iris - Two people", size: "20cmx20cm", frame: "Standard frame picture", price: 12000 },
    { product: "Duo iris - Two people", size: "30cmx30cm", frame: "Standard frame picture", price: 14500 },
    { product: "Duo iris - Two people", size: "30cmx30cm", frame: "Professional frame picture", price: 17500 },
    { product: "Duo iris - Two people", size: "40cmx40cm", frame: "Standard frame picture", price: 19000 },
    { product: "Duo iris - Two people", size: "40cmx40cm", frame: "Professional frame picture", price: 23000 },
    { product: "Duo iris - Two people", size: "50cmx50cm", frame: "Professional frame picture", price: 26000 },

    { product: "Trio iris - Three people", size: "20cmx20cm", frame: "Standard frame picture", price: 15000 },
    { product: "Trio iris - Three people", size: "30cmx30cm", frame: "Standard frame picture", price: 17500 },
    { product: "Trio iris - Three people", size: "30cmx30cm", frame: "Professional frame picture", price: 20500 },
    { product: "Trio iris - Three people", size: "40cmx40cm", frame: "Standard frame picture", price: 23000 },
    { product: "Trio iris - Three people", size: "40cmx40cm", frame: "Professional frame picture", price: 28000 },
    { product: "Trio iris - Three people", size: "50cmx50cm", frame: "Professional frame picture", price: 32500 },

    { product: "Quadruple iris - Four people", size: "20cmx20cm", frame: "Standard frame picture", price: 18500 },
    { product: "Quadruple iris - Four people", size: "30cmx30cm", frame: "Standard frame picture", price: 23000 },
    { product: "Quadruple iris - Four people", size: "30cmx30cm", frame: "Professional frame picture", price: 28000 },
    { product: "Quadruple iris - Four people", size: "40cmx40cm", frame: "Standard frame picture", price: 32000 },
    { product: "Quadruple iris - Four people", size: "40cmx40cm", frame: "Professional frame picture", price: 36000 },
    { product: "Quadruple iris - Four people", size: "50cmx50cm", frame: "Professional frame picture", price: 42000 }
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
