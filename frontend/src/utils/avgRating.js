const calculateAvgRating = reviews => {
    const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
    let avgRating = totalRating === 0 ? '' : totalRating === 1 ? totalRating : totalRating / reviews?.length;

    avgRating = avgRating ? parseFloat(avgRating.toFixed(1)) : avgRating;

    return {
        totalRating,
        avgRating
    };
}

export default calculateAvgRating;
