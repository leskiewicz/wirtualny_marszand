import numpy as np
import math as m
import matplotlib.pyplot as plt

def koder(b):
    print(b)
    w = []
    w.append = (b[0] + b[1] + b[3]) % 2
    w.append=b[0]
    w.append = (b[0] + b[2] + b[3]) % 2
    w.append = (b[1] + b[2] + b[3]) % 2
    # w=p1+p2+b[0]+p3+b[1]+b[2]+b[3]
    w.append=b[1]
    w.append=b[2]
    w.append=b[3]
    print(w)
    return w


def dekoder(b):
    print(b)


# def konwertuj(string):
#     return ''.join(format(i, 'b') for i in bytearray(string, encoding='utf8'))
# napis= konwertuj('a')
# napis=list(napis)
# napis = [int(i) for i in napis]

n = 7
k = 4
m = n - k

napis = ("1101")
napis = [int(i) for i in napis]
# enc = encode(napis)
# print(enc)
kod = koder(napis)
print(kod)