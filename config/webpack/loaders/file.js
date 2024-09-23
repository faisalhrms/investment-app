module.exports = {
    test: /\.(png|jpe?g|gif|webp|svg)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
            },
        },
    ],
};
