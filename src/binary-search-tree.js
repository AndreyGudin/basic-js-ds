const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.bstRoot = null;
  }

  root() {
    return this.bstRoot;
  }

  add(data) {
    this.bstRoot = addWithin(this.bstRoot, data);
    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return hasWithin(this.bstRoot, data);
    function hasWithin(node, data) {
      if (!node) {
        return false;
      }
      if (data === node.data) {
        return true;
      }
      return data < node.data
        ? hasWithin(node.left, data)
        : hasWithin(node.right, data);
    }
  }

  find(data) {
    if (!this.bstRoot) {
      return;
    }
    return findWithin(this.bstRoot, data);
    function findWithin(node, data) {
      if (!node) {
        return null;
      }
      if (data === node.data) {
        return node;
      }
      return data < node.data
        ? findWithin(node.left, data)
        : findWithin(node.right, data);
    }
  }

  remove(data) {
    this.bstRoot = removeWithin(this.bstRoot, data);
    function removeWithin(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeWithin(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeWithin(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
      }
      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }
      let minFromRight = node.right;
      while (minFromRight.left) {
        minFromRight = minFromRight.left;
      }
      node.data = minFromRight.data;

      node.right = removeWithin(node.right, minFromRight.data);

      return node;
    }
  }

  min() {
    if (!this.bstRoot) {
      return;
    }
    let min = this.bstRoot;
    while (min.left) {
      min = min.left;
    }
    return min.data;
  }

  max() {
    if (!this.bstRoot) {
      return;
    }
    let max = this.bstRoot;
    while (max.right) {
      max = max.right;
    }
    return max.data;
  }
}

module.exports = {
  BinarySearchTree
};