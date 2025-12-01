export enum MemoryType {
  Global_Int32 = "Global_Int32",
  Global_Int16 = "Global_Int16",
  Global_UInt8 = "Global_UInt8",
  Global_Float = "Global_Float",
  Global_Bool = "Global_Bool",
  Temp_Int32 = "Temp_Int32",
  Temp_Int16 = "Temp_Int16",
  Temp_UInt8 = "Temp_UInt8",
  Temp_Float = "Temp_Float",
  Temp_Bool = "Temp_Bool",
  Local_Int32 = "Local_Int32",
  Local_Int16 = "Local_Int16",
  Local_UInt8 = "Local_UInt8",
  Local_Float = "Local_Float",
  Local_Bool = "Local_Bool",
  Struct_Pointer = "Struct_Pointer",
}

interface MemorySegment {
  start: number;
  end: number;
  current: number;
}

interface ArrayInfo {
  base: number;
  length: number;
  type: string;
}

export class MemoryAllocator {
  private segments: Map<MemoryType, MemorySegment>;
  private symbolMap: Map<string, number>;
  private symbolTypes: Map<string, string>;
  private declaredNames: Set<string>;
  private arrayInfo: Map<string, ArrayInfo>;
  private immutableNames: Set<string> = new Set();

  constructor(scope: "global" | "local" = "global") {
    this.segments = new Map();
    this.symbolMap = new Map();
    this.symbolTypes = new Map();
    this.declaredNames = new Set();
    this.arrayInfo = new Map();

    if (scope === "global") {
      this.initGlobalSegments();
    } else {
      this.initLocalSegments();
    }

    // Temps (shared across scopes)
    this.segments.set(MemoryType.Temp_Int32, {
      start: 5000,
      end: 5299,
      current: 5000,
    });
    this.segments.set(MemoryType.Temp_Int16, {
      start: 5300,
      end: 5599,
      current: 5300,
    });
    this.segments.set(MemoryType.Temp_UInt8, {
      start: 5600,
      end: 5899,
      current: 5600,
    });
    this.segments.set(MemoryType.Temp_Float, {
      start: 6000,
      end: 6049,
      current: 6000,
    });
    this.segments.set(MemoryType.Temp_Bool, {
      start: 8500,
      end: 8524,
      current: 8500,
    });
  }

  private initGlobalSegments() {
    this.segments.set(MemoryType.Global_Int32, {
      start: 1000,
      end: 1099,
      current: 1000,
    });
    this.segments.set(MemoryType.Global_Int16, {
      start: 1100,
      end: 1199,
      current: 1100,
    });
    this.segments.set(MemoryType.Global_UInt8, {
      start: 1200,
      end: 1299,
      current: 1200,
    });
    this.segments.set(MemoryType.Global_Float, {
      start: 2000,
      end: 2099,
      current: 2000,
    });
    this.segments.set(MemoryType.Global_Bool, {
      start: 8000,
      end: 8049,
      current: 8000,
    });
    this.segments.set(MemoryType.Struct_Pointer, {
      start: 1300,
      end: 1499,
      current: 1300,
    });
  }

  private initLocalSegments() {
    this.segments.set(MemoryType.Local_Int32, {
      start: 3000,
      end: 3099,
      current: 3000,
    });
    this.segments.set(MemoryType.Local_Int16, {
      start: 3100,
      end: 3199,
      current: 3100,
    });
    this.segments.set(MemoryType.Local_UInt8, {
      start: 3200,
      end: 3299,
      current: 3200,
    });
    this.segments.set(MemoryType.Local_Float, {
      start: 4000,
      end: 4099,
      current: 4000,
    });
    this.segments.set(MemoryType.Local_Bool, {
      start: 9000,
      end: 9049,
      current: 9000,
    });
    this.segments.set(MemoryType.Struct_Pointer, {
      start: 3300,
      end: 3499,
      current: 3300,
    });
  }

  public allocate(name: string, type: string): number {
    this.ensureNameAvailable(name);

    const memType = this.resolveMemoryType(type, false);
    const address = this.getNextAddress(memType);
    this.symbolMap.set(name, address);
    this.symbolTypes.set(name, type);
    return address;
  }

  public allocateArray(name: string, type: string, length: number): number {
    this.ensureNameAvailable(name);

    if (length <= 0) {
      throw new Error(`Array '${name}' must have a positive length`);
    }

    const memType = this.resolveMemoryType(type, false);
    const segment = this.segments.get(memType);
    if (!segment) throw new Error(`Segment for ${memType} not initialized.`);

    const base = segment.current;
    const end = base + length - 1;
    if (end > segment.end) {
      throw new Error(
        `Out of memory for segment ${memType} while allocating array '${name}'`
      );
    }
    segment.current = end + 1;

    this.arrayInfo.set(name, { base, length, type });
    this.symbolTypes.set(name, type);
    return base;
  }

  public allocateTemp(type: string): number {
    const memType = this.resolveMemoryType(type, true);
    return this.getNextAddress(memType);
  }

  public getAddress(name: string): number {
    const addr = this.symbolMap.get(name);
    if (addr === undefined) {
      throw new Error(`Variable '${name}' not found.`);
    }
    return addr;
  }

  public getArrayBase(name: string): number {
    const info = this.arrayInfo.get(name);
    if (!info) {
      throw new Error(`Array '${name}' not found.`);
    }
    return info.base;
  }

  public getArrayLength(name: string): number {
    const info = this.arrayInfo.get(name);
    if (!info) {
      throw new Error(`Array '${name}' not found.`);
    }
    return info.length;
  }

  public getType(name: string): string {
    const type = this.symbolTypes.get(name);
    if (type === undefined) {
      throw new Error(`Variable '${name}' not found.`);
    }
    return type;
  }

  public markImmutable(name: string) {
    this.immutableNames.add(name);
  }

  public isImmutable(name: string): boolean {
    return this.immutableNames.has(name);
  }

  public hasSymbol(name: string): boolean {
    return this.symbolMap.has(name);
  }

  public hasArray(name: string): boolean {
    return this.arrayInfo.has(name);
  }

  private resolveMemoryType(type: string, isTemp: boolean): MemoryType {
    const scopePrefix = this.segments.has(MemoryType.Local_Int32)
      ? "Local"
      : "Global";
    switch (type) {
      case "Int32":
      case "UInt32":
        if (isTemp) return MemoryType.Temp_Int32;
        return scopePrefix === "Local"
          ? MemoryType.Local_Int32
          : MemoryType.Global_Int32;
      case "Int16":
      case "UInt16":
        if (isTemp) return MemoryType.Temp_Int16;
        return scopePrefix === "Local"
          ? MemoryType.Local_Int16
          : MemoryType.Global_Int16;
      case "Int8":
      case "UInt8":
        if (isTemp) return MemoryType.Temp_UInt8;
        return scopePrefix === "Local"
          ? MemoryType.Local_UInt8
          : MemoryType.Global_UInt8;
      case "Float":
        if (isTemp) return MemoryType.Temp_Float;
        return scopePrefix === "Local"
          ? MemoryType.Local_Float
          : MemoryType.Global_Float;
      case "Bool":
        if (isTemp) return MemoryType.Temp_Bool;
        return scopePrefix === "Local"
          ? MemoryType.Local_Bool
          : MemoryType.Global_Bool;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }

  private ensureNameAvailable(name: string) {
    if (this.declaredNames.has(name)) {
      throw new Error(`Variable or array '${name}' already declared.`);
    }
    this.declaredNames.add(name);
  }

  private getNextAddress(type: MemoryType): number {
    const segment = this.segments.get(type);
    if (!segment) throw new Error(`Segment for ${type} not initialized.`);

    if (segment.current > segment.end) {
      throw new Error(`Out of memory for segment ${type}`);
    }

    return segment.current++;
  }

  public allocateAnonymous(type: string): number {
    const memType = this.resolveMemoryType(type, false);
    return this.getNextAddress(memType);
  }

  public allocateStructDescriptor(slotCount: number): number {
    const segment = this.segments.get(MemoryType.Struct_Pointer);
    if (!segment) {
      throw new Error("Struct pointer segment not initialized");
    }
    if (segment.current + slotCount - 1 > segment.end) {
      throw new Error("Out of struct descriptor space");
    }
    const base = segment.current;
    segment.current += slotCount;
    return base;
  }

  public resetTemps() {
    // Optional: Reset temp counters after a statement/block to reuse memory
    // For MVP, we won't reset to keep debugging simple
  }
}
