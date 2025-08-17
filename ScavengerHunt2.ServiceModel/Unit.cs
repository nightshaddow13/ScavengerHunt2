using ServiceStack;
using ServiceStack.DataAnnotations;
using System.Collections.Generic;

namespace ScavengerHunt.ServiceModel;

#region Base definition

[Icon(Svg = Icons.Unit)]
public class Unit : AuditBase
{
    [AutoIncrement]
    public long Id { get; set; }

    public UnitType Type { get; set; }
    public int Number { get; set; }

    [Reference]
    public List<Scouter> Scouters { get; set; } = [];
}

public enum UnitType
{
    Pack,
    Troop,
    Crew,
    Ship
}

#endregion

#region Interactions

[Tag("Scouters"), Description("Find Units")]
//[ValidateHasRole(Roles.Camper)]
[AutoApply(Behavior.AuditQuery)]
[Route("/Units")]
public class QueryUnits : QueryDb<Unit> { }

[Tag("Scouters"), Description("Create a new Unit")]
[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditCreate)]
public class CreateUnit : ICreateDb<Unit>, IReturn<IdResponse>
{
    [ApiAllowableValues(typeof(UnitType))]
    public UnitType Type { get; set; }

    [ValidateGreaterThan(0)]
    public int Number { get; set; }
}

[Tag("Scouters"), Description("Update an existing Unit")]
[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditModify)]
public class UpdateUnit : IPatchDb<Unit>, IReturn<IdResponse>
{
    public long Id { get; set; }

    [ApiAllowableValues(typeof(UnitType))]
    public UnitType Type { get; set; }

    [ValidateGreaterThan(0)]
    public int Number { get; set; }
}

[Tag("Scouters"), Description("Delete a Unit")]
[ValidateHasRole(Roles.Admin)]
[AutoApply(Behavior.AuditSoftDelete)]
public class DeleteUnit : IDeleteDb<Unit>, IReturnVoid
{
    public long Id { get; set; }
}

#endregion