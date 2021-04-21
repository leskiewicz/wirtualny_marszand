import numpy as np
import math as m
import matplotlib.pyplot as plt

def mod_apl(x):
    za = []
    for i in range(len(x)):
        t = i * ts
        if x[i] == '0':
            za.append(A1 * (m.sin(2 * m.pi * fn * t)))
        elif x[i] == '1':
            za.append(A2 * (m.sin(2 * m.pi * fn * t)))
    plt.plot(za)
    plt.show()
    return za


def mod_fazy(x):
    zp = []
    for i in range(len(x)):
        t = i * ts
        if x[i] == '0':
            zp.append(m.sin(2 * m.pi * fn * t))
        elif x[i] == '1':
            zp.append(m.sin(2 * m.pi * fn * t + m.pi))
    plt.plot(zp)
    plt.show()
    return zp


def mod_cz(x):
    zf = []
    for i in range(len(x)):
        t = i * ts
        if x[i] == '0':
            zf.append(m.sin(2 * m.pi * fn1 * t))
        elif x[i] == '1':
            zf.append(m.sin(2 * m.pi * fn2 * t))
    plt.plot(zf)
    plt.show()
    return zf


def konwertuj(string):
    # return ''.join(format(ord(x), 'b') for x in string)
    return ''.join(format(i, 'b') for i in bytearray(string, encoding='utf8'))

napis = '''ascutdayvgtzsyrdtjugyfsdfgvbhujdxcfvgbhnjdxcfvgbhwzesxdrcftgvh
xdrcftvgqazwxsecdrvftgbyhtxhddrhcftvuygklihkenbfryiwekcuocbqwucxdfcgvhdfg
hddrhcftvuygklihkenbfryiwekcuocbqwucerrewwwwwwerwrsedtfghvxdfcgdrtfvygcft'''
# napis = 'krotki napis zeby mozna bylo zmodulowac te sygnaly'
b = konwertuj(napis)
# print(b)

tc = 400  # czas trwania
fs = 6000  # częstotliwość próbkowania
# N = tc * fs  # liczba próbek na cały sygnał
ts = 1 / fs  # okres próbkowania

Tb = tc/len(b)  # czas trwania pojedynczego bitu
A1 = 2
A2 = 3
W = 4
fn = W * Tb ** (-1)  # częstotliwość nośna
fn1 = (W + 1) / Tb
fn2 = (W + 2) / Tb

apl = mod_apl(b)
fazy = mod_fazy(b)
cz = mod_cz(b)