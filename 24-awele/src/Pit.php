<?php declare(strict_types=1);

final class Pit
{
  public string $name;
  public int $seeds;

  public function __construct(string $name, int $seeds=0)
  {
    $this->name = $name;
    $this->seeds = $seeds;
  }
}