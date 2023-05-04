const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Item = require("../../models/Item");

//add item
router.post(
    "/add",
    auth,
    [
      check("name", "Name is required").notEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        let itemFields = {};
  
        if (req.body.name) itemFields.name = req.body.name;
        itemFields.createdBy = req.user.id;
  
        let item = await new Item(itemFields);
  
        await item.save();
  
          res.status(200).send({
            msg: "Item Created",
            data: item,
          });
        
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    }
  );

  //update item
router.put(
    "/update/:id",
    auth,
    [
        check("name", "Name is required").notEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        let itemFields = {};
  
        if (req.body.name) itemFields.name = req.body.name;
      
        let item = await Item.findByIdAndUpdate(
          req.params.id,
          { $set: itemFields },
          { new: true }
        );
  
        if (!item)
          return res.status(400).json({ msg: "Not the user of this item" });
  
        res.status(200).send({
          msg: "item Updated",
          data: item,
        });
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    }
  )

  //delete item
router.delete("/delete/:id", auth, async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
  
      if (!item) {
        return res.status(404).json({ msg: "item not found" });
      }
  
      if (item.createdBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
  
      await item.remove();
  
      
      return res.json({ msg: "item removed" });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });

  //get all items
router.get("/allItems", async (req, res) => {
    try {
      const items = await Item.find().populate('createdBy', 'name email');
      res.status(200).send(items);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });

  //get item by id
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('createdBy', 'name email');
  
      if (!item) {
        return res.status(404).json({ msg: "Item not found" });
      }
  
      res.status(200).send(item);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });

  module.exports = router;