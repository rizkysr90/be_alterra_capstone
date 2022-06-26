function pagination(page,row) {
    if (row === undefined || row === "" || row < 0)  {
        row = 10;
    }
    // Setting default row,jadi dalam 1 page secara default ada 10 row data
    if (page === undefined || page === "") {
        page = 1;
    }
    
    page = ((Number(page) - 1) * Number(row));
    return {page,row};
}
module.exports = pagination;
