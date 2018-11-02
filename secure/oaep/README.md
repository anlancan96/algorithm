## Optimal Asymmetric Encryption Padding 
### Diagram of OAEP
In the diagram:
* n is the number of bits in the RSA moduls
* k0 vs k1 are integers fixed by the protocol 
* m is the plaintext message, a (n-k0-k1) bit strings
* G and H are typically some <a href="https://en.wikipedia.org/wiki/Cryptographic_hash_function">cryptographic hash function</a> fixed by the protocol 
* ⊕ is XOR operation
## To encode:
* message is padding with k1 zeros to be n - k0 bits in length
* r is randomly genarated by k0 bit string
* G expands the k0 bit of r to n - k0 bits
* X = m000.... ⊕ G(r)
* H reduces the n - k0 bit of X to k0 bits
* Y = r ⊕ H(X)
* The output is X || Y where X is shown in the diagram as the leftmost block and Y as the rightmost block.
## To decode:
* Recover the random string as r = Y ⊕ H(X)
* Recover the message as m00..0 = X ⊕ G(r)
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Oaep-diagram-20080305.png/250px-Oaep-diagram-20080305.png" style="float: left"/>
