const Connection = require("./Connection");

class Product extends Connection{
    constructor(title,description,price,quantity,category){
        super()
        this.title=title
        this.description=description
        this.price=price
        this.quantity=quantity
        this.category=category
    }
   static async all(){
        const [rows]=await Product.connect.query('select * from product')
        return rows
    }
    static async find(id){
        const [item]=await Product.connect.query('select * from product where id=?',[id])
        return item[0]
    }
    static async Insert(product){
        const {title,description,price,quantity,category}=product
        const [{affectedRows}]=await Product.connect.query('insert into product values(null,?,?,?,?,?)',[title,description,price,quantity,category])
        if(affectedRows){
            return true
        }
        return false
    }
    static async delete(id){
        const [{affectedRows}]=await Product.connect.query('delete from product where id=?',[id])
        if(affectedRows){
            return true
        }
        return false
    }
    static async update(product,id){
        const {title,description,price,quantity,category}=product
        const [{affectedRows}]=await Product.connect.query('update product set title=?,description=?,price=?,quantity=?,category=? where id=?',[title,description,price,quantity,category,id])
        if(affectedRows){
            return true
        }
        return false
    }
    async save(){
        const [{affectedRows}]=await Product.connect.query('insert into product values(null,?,?,?,?,?)',[this.title,this.description,this.price,this.quantity,this.category])
        if(affectedRows){
            return true
        }
        return false
    }
    static async search(title){
        const [products]=await Product.connect.query('select * from product where title like ?',[`%${title}%`])
        return products
    }
}
module.exports=Product