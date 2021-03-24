import math as m
import cmath as cm
import time
import numpy as np

def dft(x):
    wyniki = []
    N = len(x)
    szereg = 0
    for k in range(N):
        for n in range(N):
            szereg = szereg + x[n] * cm.exp(1j * ((2 * cm.pi * k * n) / N))
        wyniki.append(szereg)
    return wyniki

x = []
for i in range(10):
    x.append(i)

start = time.perf_counter()
dft(x)
koniec = time.perf_counter()
print('Czas wynosi', f"{(koniec - start):.10f}", 'sekund')
# print('Czas wynosi',koniec-start,'sekund')

start = time.perf_counter()
np.fft.fft(x)
koniec = time.perf_counter()
print('Czas wynosi', f"{(koniec - start):.10f}", 'sekund')
# print('Czas wynosi',koniec-start,'sekund')

print(dft(x))
print(np.fft.fft(x))