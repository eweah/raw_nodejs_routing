## Pure NodeJs Routing, A Right Way: Server, API, Routing

<!-- ### [RAW NodeJs: Routing A Right Way](https://github.com/ericsonsweah/raw_nodejs_routing_a_right_way "Server, API, Routing") -->

You've read it right! This is raw nodejs or pure nodejs. This is zero dependencies. Here there is no npm, no yarn, no dependencies, no frameworks, no libraries, no CDNs, no copying and pasting someone else's codes, and certainly no package.json: just plain old Javascript and raw (or pure) NodeJs.

This may be the basic for your starting point if you want to build API, or Server with only raw nodejs with zero dependencies.

### Notes

This project uses Object Oriented Programming (OOP) and Functional Programming (FP) heavily. By Object Oriented Programming I mean Object Oriented Programming the Javascript way and specifically the ES6 way. And by Functional Programming I mean functional programming the Javascript way; specifically the ES6 way. It also uses NodeJs Native Stream API heavily especially the ```Transfrom``` API.

Almost all the backend codes and all the classes of the backend code inherit a single NodeJs API class:

```javascript
 Transform
```

### installation

1. clone the repository:

 ```javascript
 git clone https://github.com/ericsonsweah/raw_nodejs_routing_a_right_way raw_node_routing
```

or

  ```javascript
 gh repo clone ericsonsweah/raw_nodejs_routing_a_right_way raw_node_routing
 ```

  Note: to use the command ```gh repo clone ericsonsweah/raw_nodejs_routing_a_right_way raw_node_routing``` you must have  Github CLI ```gh``` installed on your system.

2. cd in the directory:

```javascript
cd raw_node_routing
```

3. run the command:

```javascript
 node index
```

 After successfully runing the command ```node index``` or ```node index.js``` in step 3, the server should start.
