from src.compiler import Compiler
from src.virtual_machine import VirtualMachine
import os
from src.config.definitions import PROGRAMS_DIR

print("\n\n\n")
FILENAME = input("enter a file to run from the programs directory:  ex. book.ty \n")


def main():
    filename = os.path.join(PROGRAMS_DIR, FILENAME)
    file = open(filename)
    data = file.read()
    file.close()

    compiler = Compiler()
    json_data = compiler.compile(data, debug=True)

    virtual_machine = VirtualMachine()
    virtual_machine.run(json_data)


if __name__ == '__main__':
    main()
