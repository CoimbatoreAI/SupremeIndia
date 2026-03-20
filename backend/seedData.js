require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const Machine = require('./models/Machine');
const User = require('./models/User');

const products = [
    { name: "Tags", desc: "Premium hang tags with custom shapes, embossing, and foil stamping for brand identity.", useCases: "Garments, retail, fashion exports", category: "Tags & Labels" },
    { name: "Main Labels", desc: "Woven and printed main labels with high-definition branding and wash durability.", useCases: "Apparel, textiles, premium fashion", category: "Tags & Labels" },
    { name: "Printed Labels", desc: "Multi-color offset printed labels with crisp graphics and text reproduction.", useCases: "Garments, accessories, home textiles", category: "Tags & Labels" },
    { name: "Wash Care Labels", desc: "Durable care instruction labels meeting international compliance standards.", useCases: "Export garments, retail clothing", category: "Tags & Labels" },
    { name: "Size Labels", desc: "Precision-cut size labels in all standard and custom size runs.", useCases: "Fashion, sportswear, uniforms", category: "Tags & Labels" },
    { name: "Brand Labels", desc: "Custom brand identity labels with premium finishes including foiling and embossing.", useCases: "Luxury brands, retail, exports", category: "Tags & Labels" },
    { name: "Sticker Printed Labels", desc: "Self-adhesive labels with high-resolution printing on various substrates.", useCases: "Products, packaging, retail", category: "Stickers & Printed Materials" },
    { name: "Price Tickets", desc: "Retail-ready price tags and tickets with barcode and brand customization.", useCases: "Retail stores, fashion brands", category: "Stickers & Printed Materials" },
    { name: "Printed Boards", desc: "High-quality printed boards for display and packaging applications.", useCases: "Retail displays, product packaging", category: "Stickers & Printed Materials" },
    { name: "Printed Tapes", desc: "Custom branded packaging tapes with company logos and messaging.", useCases: "E-commerce, logistics, exports", category: "Stickers & Printed Materials" },
    { name: "Mono Cartons", desc: "Premium single-material cartons with high-end printing and finishing options.", useCases: "Cosmetics, pharma, retail", category: "Packaging Solutions" },
    { name: "PDQ Trays", desc: "Point-of-sale display trays engineered for maximum product visibility.", useCases: "Retail, FMCG, store displays", category: "Packaging Solutions" },
    { name: "Belly Bands", desc: "Product wrapping bands with full-color printing for shelf appeal.", useCases: "Garments, gift sets, retail", category: "Packaging Solutions" },
    { name: "Header Cards", desc: "Display-ready header cards for hanging products in retail environments.", useCases: "Retail, accessories, toys", category: "Packaging Solutions" },
    { name: "Board Hangers", desc: "Rigid board hangers for premium product display and branding.", useCases: "Fashion retail, accessories", category: "Packaging Solutions" },
    { name: "Brief Boxes", desc: "Compact packaging boxes for innerwear and small garment items.", useCases: "Garments, innerwear, exports", category: "Packaging Solutions" }
];

const machines = [
    {
        name: "Heidelberg Offset 6 Colour Machine",
        capacity: "40,000 sheets/shift",
        features: ["6-colour precision printing", "High-speed offset technology", "Consistent color reproduction", "German engineering standards"]
    },
    {
        name: "Auto Die Cutting Machine",
        capacity: "50,000 sheets/shift",
        features: ["Embossing capability", "Debossing capability", "Precision die cutting", "Complex shape processing"]
    },
    {
        name: "Window Film Pasting Machine",
        capacity: "50,000 pcs/shift",
        features: ["Precision film application", "Transparent window creation", "High-speed automation", "Quality consistency"]
    },
    {
        name: "Side Pasting Machine",
        capacity: "50,000 pcs/shift",
        features: ["Automated side gluing", "Perfect carton formation", "High throughput", "Consistent bond strength"]
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        await Product.deleteMany();
        await Machine.deleteMany();
        await User.deleteMany();

        await Product.insertMany(products);
        await Machine.insertMany(machines);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

        await User.create({
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword
        });

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seed();
