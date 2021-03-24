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
for p in range(8,32):
    x.append(2**p)

start = time.perf_counter()
dft(x)
koniec = time.perf_counter()
dft_time=koniec - start
print('Czas DFT wynosi', f"{dft_time:.10f}", 'sekund')
# print('Czas wynosi',koniec-start,'sekund')

start = time.perf_counter()
np.fft.fft(x)
koniec = time.perf_counter()
fft_time=koniec - start
print('Czas FFT wynosi', f"{fft_time:.10f}", 'sekund')
# print('Czas wynosi',koniec-start,'sekund')
print('Różnica w czasach wynosi', dft_time-fft_time,'sekund')

# print(dft(x))
# print(np.fft.fft(x))