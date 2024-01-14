/*
 * Title: Create Entity 
 * Description: Create any entity here.
 * Author: Md Abdullah
 * Date: 14/01/24
 */


const createEntity = async (Model, entity) => await Model.create({ ...entity });


module.exports = {
    createEntity,
}
