#include <iostream>

int funkcja(int x) {
	return x * x + 2 * x + 3;
}

int main()
{
	int tab[20];
	for (int i = 0; i < 10; i++) {
		tab[i] = funkcja(i);
		std::cout << tab[i] << std::endl;
	}
}
